# Event Grid with PostgreSQL Data update 
## Using Microsoft EventGrid and Azure Database for PostgreSQL

In our Example, we are using the PG_notify from database side to send the notification message; there’s another process which is listening to the notification and publish the event to Azure EventGrid; Last, there’s the subscribers to the Azure EventGrid which process the data it receives.



## Pre-requisites
### Setup the Azure Database for PostgreSQL
- An Azure Database for PostgreSQL server or [create one](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)
- the postgres terminal [psql](https://www.postgresql.org/docs/9.6/static/app-psql.html) installed on your computer

### Create EventGrid Topic
Follow the steps https://docs.microsoft.com/en-us/azure/event-grid/custom-event-quickstart-portal#create-a-custom-topic to create a custom event grid topic.  

## To run the sample code
In file ```\EventGridPublisher\MainWindow.xaml.cs```, please fill in the PostgreSQL Server connection information and Event Grid endpoint and key.
In file ```\EventGridListner\Helper.cs```, please fill in the PostgreSQL server connection string. 

## Detailed Steps
### Step 1: Set up PG Notify
Connect to the database and define the notification according to the table and column need to send.
In our example, the function is on Product table and sending the Id as the unique identifier to receivers for correct action. The function looks like the following: 

	-- DROP FUNCTION public."Products_update_notify"();
	CREATE FUNCTION public."Products_update_notify"()
		RETURNS trigger
		LANGUAGE 'plpgsql'
		COST 100
		VOLATILE NOT LEAKPROOF 
	AS $BODY$
	DECLARE
	  Id uuid;
	BEGIN
	  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
		Id = NEW."Id";
	  ELSE
		Id = OLD."Id";
	  END IF;
	  PERFORM pg_notify('productsnotification', TG_OP || ';' || Id );
	  RETURN NEW;
	END;

Then Create Triggers on the table that sends notification. For example, for Products table, we can create the trigger for update like the following.

	CREATE TRIGGER products_notify_update
		AFTER UPDATE 
		ON public."Products"
		FOR EACH ROW
		EXECUTE PROCEDURE public."Products_update_notify"();

		
We also created similar triggers for insert and delete.

### Step 2: Write a process that’s listening to this notify 
In our example, this is written in WPF application for demo purpose. This can be implemented in any process. 
The main part for listening to work is:
1.	Add the Npgsql Nuget package to the project.
2.	Connect to the pg server
    
	this.notificationConnection = new NpgsqlConnection(connectionstring);
    this.notificationConnection.Open();

3.	Add the action to listen to the channel
    
	using (var command = new NpgsqlCommand("listen "+ TriggerChannelName, this.notificationConnection))
    {
          command.ExecuteNonQuery();
    }

    this.notificationConnection.Notification += this.PostgresNotification;

In this function “PostgreNotification”, you can put any action you’d like to put. In our example, the WPF application will write the message, and publish the event to event grid.

### Step 3: Define the Event for publishing to Event Grid
Event Grid defines the following schema for all event publishers:

	[
	  {
		"topic": string,
		"subject": string,
		"id": string,
		"eventType": string,
		"eventTime": string,
		"data":{
		  object-unique-to-each-publisher
		},
		"dataVersion": string,
		"metadataVersion": string
	  }
	]

In our example, we define the following structure so any subscriber will be able to process the receiving data:

            eventsList.Add(new EventGridEvent()
            {
                Id = Guid.NewGuid().ToString(),
                EventType = "EComPOC.Items.ItemReceived",
                Data = new ItemReceivedEventData()
                {
                    OperationType = eventDetails[0],
                    ItemId = eventDetails[1]
                },
                EventTime = DateTime.Now,
                Subject = "ProductDataUpdate",
                DataVersion = "1.0"
            });

More detailed explanation can be found here: https://docs.microsoft.com/en-us/azure/event-grid/event-schema. 

### Step 4: Publish the event to Event Grid Topic
In the function above, we define the process of publishing the data to Event Grid. The key is to get the topic endpoint and key from Azure Portal.

     string topicHostname = new Uri(topicEndpoint).Host;
     TopicCredentials topicCredentials = new TopicCredentials(topicKey);
     EventGridClient client = new EventGridClient(topicCredentials);

     client.PublishEventsAsync(topicHostname, GetEventsList(oneEvent)).GetAwaiter().GetResult();


### Step5: Subscribe to the event and processing the data
In our example, we’re implementing a Web Site. In order to subscribe to the Event Grid, the controller needs to implement the validation code for subscription. 

	if (EventTypeSubcriptionValidation)
	{
	   var gridEvent =
	   JsonConvert.DeserializeObject<List<EventGrid<Dictionary<string,string>>>> 
			 (jsonContent).First();

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

This piece of code is only used for subscribing to Event Grid Topic. After the web site is live, the subscribing process can be followed here. 
The other part of the controller is the business logic. Deserialize the data and perform business logic.

	else if (EventTypeNotification)
	{
	   var eventData = JObject.Parse(jsonContent);
	   ……


## Failure handling
Azure Event Grid is ensuring service SLA as 99.99%(https://azure.microsoft.com/en-us/support/legal/sla/event-grid/v1_0/). In case of PostgreSQL not able to publish notification, PG notify holds a queue with default 8GB. Please refer to PG NOTIFY docs for details: https://www.postgresql.org/docs/current/sql-notify.html.

Event Grid message has built-in mechanism for handling events when delivery isn't acknoledged. Read more: https://docs.microsoft.com/en-us/azure/event-grid/delivery-and-retry.  