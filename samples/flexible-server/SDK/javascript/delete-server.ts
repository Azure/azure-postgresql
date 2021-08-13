const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const { PostgreSQLManagementClient } = require("@azure/arm-postgresql-flexible");
const subscriptionId = "00000000-0000-0000-0000-000000000000"

msRestNodeAuth.interactiveLogin().then((creds) => {
    try {
      const postgresServerClient = new PostgreSQLManagementClient(creds, subscriptionId);
      const resourceGroupName = "daeunyim-rg";
      const serverName = "daeunyim-node-eastus";
  
      console.log("Time:", new Date(), "API Version: ", postgresServerClient.apiVersion);
  
      postgresServerClient.servers.get(resourceGroupName, serverName);
  
    } catch (err) {
      console.log("An error occurred:");
      console.dir(err, { depth: null, colors: true });
    }
  });
  