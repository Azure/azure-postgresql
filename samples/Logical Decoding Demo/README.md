# Event Grid with PostgreSQL Logical Decoding and wal2json

## Using Microsoft EventGrid and Azure Database for PostgreSQL flexible server
In this example we are using [Logical decoding](https://www.postgresql.org/docs/current/logicaldecoding.html) from database side to stream data manipulation changes (DML) such as ```INSERT```, ```UPDATE``` and ```DELETE``` through a [replication slot](https://www.postgresql.org/docs/current/logicaldecoding-explanation.html#LOGICALDECODING-REPLICATION-SLOTS) with plugin ```wal2json``` to external consumers. In this case, the sample app is an asynchronous consumer that is listening to the replication slot and publishing the events to Azure EventGrid. Finally, the subscribers to the EventGrid topic will process these changes.

## Pre-requisites

### Setup the Azure Database for PostgreSQL flexible server
- Use an existing server or create a [new one](https://docs.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server-portal).
- Postgres terminal [psql](https://www.postgresql.org/docs/current/app-psql.html) installed on your computer.

### Configure logical decoding
1. Logical decoding and [read replicas](https://docs.microsoft.com/en-us/azure/postgresql/single-server/concepts-read-replicas) both depend on Postgres [Write Ahead Log (WAL)](https://www.postgresql.org/docs/current/wal-intro.html) and require different levels of logging from Postgres. The lowest level is ```off``` which puts the least information in the WAL, the next level is ```replica``` which is more verbose and is the minimum level required for read replicas to work, and the highest level is ```logical``` which is even more verbose and is the minimum level required for logical decoding to work (read replicas also work here). Hence, we need to set the server parameter ```wal_level``` to ```logical```. This can be done using Azure portal or Azure CLI:

    ```bash
    az postgres flexible-server parameter set -g <resourceGroup> -s <serverName> --name wal_level --value logical
    ```
2. Set the server parameter ```max_replication_slots``` to a value greater than 0. This value specifies the maximum number of replication slots that the server can support.

    ```bash
    az postgres flexible-server parameter set -g <resourceGroup> -s <serverName> --name max_replication_slots --value 10
    ```
3. Set the server parameter ```max_wal_senders``` to a value greater than 0. Thsi value specifies the maximum number of concurrent connections from standby servers or streaming base backup clients (i.e., the maximum number of simultaneously running WAL sender processes).

    ```bash
    az postgres flexible-server parameter set -g <resourceGroup> -s <serverName> --name max_wal_senders --value 10
    ```
4. Restart the server to apply the changes.

    ```bash
    az postgres flexible-server restart -g <resourceGroup> -n <serverName>
    ```
5. Ensure that the user in the database server has replication privileges. To do that, connect to the server:

    ```bash
    psql -h <hostName> -U <userName> -d <databaseName>
    ```
    And then, grant the user the replication privileges:

    ```sql
    alter user <userName> REPLICATION;
    ```
    To verify that the user has the replication privileges, run the following:

    ```sql
    \du
    ```
    You should see ```Replication``` in the ```Attributes``` column for the user:

    ```
                                                                           List of roles
    Role name       |                         Attributes                         |                                  Member of
    ----------------+------------------------------------------------------------+-----------------------------------------------------------------------------
    <userName>      | Create role, Create DB, Replication                        | {pg_read_all_settings,pg_read_all_stats,pg_stat_scan_tables,azure_pg_admin}
    ```


### Create EventGrid topic
Follow the steps https://docs.microsoft.com/en-us/azure/event-grid/custom-event-quickstart-portal#create-a-custom-topic to create a custom event grid topic.  

## To run the sample code

In file ```\Logical Decoding\LogicalDecodingPublisher\MainWindow.xaml.cs``` fill in the PostgreSQL Server connection information, Event Gridendpoint and key, and the replication slot name. Or you can just run the app and fill in the information in the UI.

## Detailed steps

### Step 1: Create the replication slot
Connect to the database with a user that has replication privileges. Then, create a replication slot:

```sql
SELECT * FROM pg_create_logical_replication_slot('<slotName>', '<pluginName>');
```

The first argument is the name of the replication slot and the second argument is the name of the logical decoding plugin. Azure Database for PostgreSQL flexible server supports ```wal2json```, ```pgoutput``` and ```test_decoding``` plugins. ```wal2json``` is the plugin and is recommended for production use. ```test_decoding``` is a simple plugin that is useful for testing and debugging.

In our example app, by using the library ```Npgsql.Replication``` we can open the connection to the database and create the replication slot like this:
    
```csharp
string connectionString = this.GetConnectionString(true);
this.pgLogicalConnection = new LogicalReplicationConnection(connectionString);
await this.pgLogicalConnection.Open();
await this.pgLogicalConnection.CreateLogicalReplicationSlot(slotTxt.Text, pluginTxt.Text);
```

### Step 2: Start an asynchronous consumer
To start listening to the output of the replication slot streaming we just created, we need to use the method ```StartLogicalReplication``` that will return us an asynchronous iterator. This iterator will yield a message for each data manipulation change that is done on the database. In our example app we print the message to the UI and to the debug console, as well as publish the message to Event Grid:

```csharp
this.cancellationTokenSource = new CancellationTokenSource();
await foreach (var message in this.pgLogicalConnection.StartLogicalReplication(new PgOutputReplicationSlot(slotTxt.Text), this.cancellationTokenSource.Token, null, options))
{
    using StreamReader reader = new StreamReader(message.Data);
    string rawData = reader.ReadToEnd();
    DateTime time = DateTime.Now;
    string type = message.GetType().Name;

    string logData = String.Format("[{0:MM/dd/yy HH:mm:ss}] [{1}]\n{2}\n\n", time, type, rawData);
    outputTxt.AppendText(logData);
    outputTxt.ScrollToEnd();
    Debug.Print(logData);

    this.PublishEvent(time, type, rawData);

    pgLogicalConnection.SetReplicationStatus(message.WalEnd);
}
```

We can also consume the messages one by one manually if we are connected to the database:

```sql
SELECT data FROM pg_logical_slot_get_changes('<slotName>', NULL, NULL, 'pretty-print', '1');
```

Or stream them using ```pg_recvlogical```:

```bash
pg_recvlogical -h <hostName> -d <databaseName> -U <userName> --slot <slotName> --start -o pretty-print=1 -f –
```

### Step 3: Configure the connection to Event Grid
To publish the messages to Event Grid we need to create a client, which is an instance of the ```EventGridPublisherClient``` class where we specify end topic endpoint and the key:

```csharp
this.eventGridClient = new EventGridPublisherClient(new Uri(topicEndpointTxt.Text), new AzureKeyCredential(topicKeyTxt.Password));
```

And then, we can publish the messages to Event Grid using the method ```SendEventsAsync```. Note that the plugin ```wal2json``` returns the messages in JSON format, so we can deserialize the message to a ```JObject``` and then publish it to Event Grid:

```csharp
private async void PublishEvent(DateTime time, string type, string rawData)
{
    object? data;
    try
    {
        data = JsonObject.Parse(rawData);
    }
    catch
    {
        data = rawData;
    }

    EventGridEvent eventGridEvent = new EventGridEvent("Logical Replication Event", type, "1.0", data)
    {
        Id = Guid.NewGuid().ToString(),
        EventTime = time,
    };

    try
    {
        await this.eventGridClient.SendEventAsync(eventGridEvent);
    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.Message, "Event Grid error", MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```

### Step 4: Make data changes to the database
To see the messages in the UI, in the debug console and in Event Grid, we need to make some data changes to the database. For example, we can create a table and issue some insertions, updates and deletions:

```sql
CREATE TABLE inventory (id SERIAL, item VARCHAR(30), qty INT, PRIMARY KEY(id));
INSERT INTO inventory (item, qty) VALUES ('apples', '100');
UPDATE inventory SET qty = 96 WHERE item = 'apples';
DELETE FROM inventory WHERE item = 'apples';
```

The output in the UI and in the debug console should look like this:

```json
[09/08/22 02:52:20] [XLogDataMessage]
{"change":[]}

[09/08/22 02:52:21] [XLogDataMessage]
{"change":[{"kind":"insert","schema":"public","table":"inventory","columnnames":["id","item","qty"],"columntypes":["integer","character varying(30)","integer"],"columnvalues":[1,"apples",100]}]}

[09/08/22 02:52:21] [XLogDataMessage]
{"change":[{"kind":"update","schema":"public","table":"inventory","columnnames":["id","item","qty"],"columntypes":["integer","character varying(30)","integer"],"columnvalues":[1,"apples",96],"oldkeys":{"keynames":["id"],"keytypes":["integer"],"keyvalues":[1]}}]}

[09/08/22 02:52:21] [XLogDataMessage]
{"change":[{"kind":"delete","schema":"public","table":"inventory","oldkeys":{"keynames":["id"],"keytypes":["integer"],"keyvalues":[1]}}]}
```

### Step 5: Stop the asynchronous consumer and drop the replication slot
To stop the asynchronous consumer, we need to cancel the ```cancellationTokenSource``` that we created in step 2:

```csharp
this.cancellationTokenSource.Cancel();
```

And after that, we can drop the replication slot and close the connection:

```csharp
await this.pgLogicalConnection.DropReplicationSlot(slotTxt.Text);
await this.pgLogicalConnection.DisposeAsync();
```

We can also drop the replication slot manually with:

```sql
SELECT pg_drop_replication_slot('<slotName>');
```
