const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const { PostgreSQLManagementClient } = require("@azure/arm-postgresql-flexible");
const subscriptionId = "00000000-0000-0000-0000-000000000000"

msRestNodeAuth.interactiveLogin().then((creds) => {
    try {
      const postgresServerClient = new PostgreSQLManagementClient(creds, subscriptionId);
      const resourceGroupName = "test-resource-group";
      const serverName = "test-server-pg";

      postgresServerClient.servers.get(resourceGroupName, serverName).then((result) => {
        console.log(result);
      });
  
    } catch (err) {
      console.log("An error occurred:");
      console.dir(err, { depth: null, colors: true });
    }
  });