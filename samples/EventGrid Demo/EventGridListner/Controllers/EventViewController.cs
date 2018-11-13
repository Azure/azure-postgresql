using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using System.Net;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using EventGridListner.Hubs;
using EventGridListner.Models;

namespace EventGridListner.Controllers
{
    [Route("api/EventView")]
    public class EventViewController : Controller
    {

        private bool EventTypeSubcriptionValidation
            => HttpContext.Request.Headers["aeg-event-type"].FirstOrDefault() ==
               "SubscriptionValidation";

        private bool EventTypeNotification
            => HttpContext.Request.Headers["aeg-event-type"].FirstOrDefault() ==
               "Notification";

        private readonly IHubContext<EventGridHub> _eventGridHubContext;

        public EventViewController(IHubContext<EventGridHub> eventGridsHubContext)
        {
            this._eventGridHubContext = eventGridsHubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                var jsonContent = await reader.ReadToEndAsync();

                if (EventTypeSubcriptionValidation)
                {
                    var gridEvent =
                JsonConvert.DeserializeObject<List<EventGrid<Dictionary<string, string>>>>(jsonContent)
                    .First();

                    await this._eventGridHubContext.Clients.All.SendAsync(
                        "eventgridrefresh",
                        gridEvent.Id,
                        gridEvent.EventType,
                        gridEvent.Subject,
                        gridEvent.EventTime.ToLongTimeString(),
                        jsonContent.ToString());

                    // Retrieve the validation code and echo back.
                    var validationCode = gridEvent.Data["validationCode"];
                    return new JsonResult(new
                    {
                        validationResponse = validationCode
                    });

                }
                else if (EventTypeNotification)
                {
                    var eventData = JObject.Parse(jsonContent);

                    var version = eventData["cloudEventsVersion"].Value<string>();
                    if (!string.IsNullOrEmpty(version))
                    {
                        var details = JsonConvert.DeserializeObject<AzureCloudEvent<Data>>(jsonContent);
                        Product prod = new ProductRepository().Get(Guid.Parse(details.Data.ItemId));
                        await this._eventGridHubContext.Clients.All.SendAsync(
                            "eventgridrefresh",
                            prod.ID,
                            prod.Name,
                            prod.ListPrice,
                            details.EventTime,
                            jsonContent
                        );

                        return Ok();
                    }

                    var events = JArray.Parse(jsonContent);
                    foreach (var e in events)
                    {
                        var details = JsonConvert.DeserializeObject<EventGrid<Data>>(e.ToString());
                        Product prod = new ProductRepository().Get(Guid.Parse(details.Data.ItemId));
                        await this._eventGridHubContext.Clients.All.SendAsync(
                            "eventgridrefresh",
                            prod.ID,
                            prod.Name,
                            prod.ListPrice,
                            details.EventTime.ToLongTimeString(),
                            e.ToString());
                    }

                    return Ok();
                }
                return BadRequest();
            }
        }
    }
}