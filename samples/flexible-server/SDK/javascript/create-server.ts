const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const { PostgreSQLManagementClient } = require("@azure/arm-postgresql-flexible");
const subscriptionId = "00000000-0000-0000-0000-000000000000"

msRestNodeAuth.interactiveLogin().then((creds) => {
  try {
    const postgresServerClient = new PostgreSQLManagementClient(creds, subscriptionId);
    const resourceGroupName = "test-resource-group";
    const serverName = "test-server-pg";

    const parameters = {
        location: "eastus2",
        administratorLogin: "postgres",
        administratorLoginPassword: "passwordfortheserver",
        version: "12",
        sku: {
          name: "Standard_D2s_v3",
          tier: "GeneralPurpose"
        },
        storage: {
            storageSizeGB: 128
        },
        backup: {
            backupRetentionDays: 10,
            geoRedundantBackup: "Disabled"
        },
        highAvailability: {
            mode: "ZoneRedundant"
        },
        maintenanceWindow: {
            customWindow: "Enabled",
            startHour: 1,
            startMinute: 20,
            dayOfWeek: 1

        },
        availabilityZone: "1",
        createMode: "Default"
    };

    postgresServerClient.servers.create(resourceGroupName, serverName, parameters).then((result) => {
      console.log(result);
    });

  } catch (err) {
    console.log("An error occurred:");
    console.dir(err, { depth: null, colors: true });
  }
});
