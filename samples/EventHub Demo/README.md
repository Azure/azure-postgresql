# Event Hub with PostgreSQL Data update 
## Using Microsoft EventHub and Azure Database for PostgreSQL

In our Example, we are using the PG_notify from database side to send the notification message; there’s another process which is listening to the notification and publish the event to Azure EventHub.



## Pre-requisites
### Setup the Azure Database for PostgreSQL
- An Azure Database for PostgreSQL server or [create one](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)
- the postgres terminal [psql](https://www.postgresql.org/docs/9.6/static/app-psql.html) installed on your computer

### Create EventHub Account and Event Hub
Follow the steps https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create to create an event hub. 

## To run the sample code
In file ```\EventHubPublisher\MainWindow.xaml.cs```, please fill in the PostgreSQL Server connection information and Event Hub Connection String and Event Hub Name.

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

In this function “PostgreNotification”, you can put any action you’d like to put. In our example, the WPF application will write the message, and publish the event to event hub.

### Step 3: Publish the event to Event Hub
Detailed steps can be found at: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send
The main steps are install the EventHubs nuget package and use the client to publish the event using the following code.

            var connectionStringBuilder = new EventHubsConnectionStringBuilder(EventHubConnectionString)
            {
                EntityPath = EventHubName
            };

            eventHubClient = EventHubClient.CreateFromConnectionString(connectionStringBuilder.ToString());
            await eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(message)));
            await eventHubClient.CloseAsync();

### Step4: Verify the event is being published. 
From Azure Portal the actual event is able to be tracked. More functions can be writeen to process the event. Detailed instruction can be found on Event Hub documentations. https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send.

Read more: https://docs.microsoft.com/en-us/azure/event-hubs/.  