using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventGridListner.Models
{
    public class EventGrid<T> where T : class
        {
            public string Id { get; set; }
            public string EventType { get; set; }
            public string Subject { get; set; }
            public DateTime EventTime { get; set; }
            public T Data { get; set; }
            public string Topic { get; set; }
        }

    public class Data
    {
        [JsonProperty(PropertyName = "itemId")]
        public string ItemId { get; set; }

        [JsonProperty(PropertyName = "operationType")]
        public string OperationType { get; set; }

    }
}
