
module.exports = async function (context, eventHubMessages) {
    var pg = require('pg');
    //const config = "postgres://<username>:<password>@<postgres servername>:5432/<database>";
    
    const config = {
                        host: 'iotpgserver.postgres.database.azure.com',
                        user: 'iotadmin@iotpgserver',     
                        password: <password>,
                        database: 'iotdemo',
                        port: 5432,
                        ssl: true
    };
    
    var client = new pg.Client(config);
    const query = 'insert into iotdata(deviceid, data) values(' + eventHubMessages.deviceId + ',\'' + JSON.stringify(eventHubMessages) + '\');';
    context.log(query);
    client.connect();
    client.query(query);
    context.log('insert completed successfully!');
    /*
    client.connect(err => {
        if (err) throw err;
        else {
            client
                .query(query)
                .then(() => {
                context.log('insert completed successfully!');
                client.end(console.log('Closed client connection'));
                 })
            .catch(err => console.log(err))
            .then(() => {
                context.log('Finished execution, exiting now');
                        });
            }
        });
        */
};
