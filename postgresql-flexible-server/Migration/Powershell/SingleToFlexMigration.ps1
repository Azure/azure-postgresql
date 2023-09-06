# Script to trigger migration by directly invoking the end point through powershell script

# Before running the script please run Connect-AzAccount and login with your azure credentials 

# The URI parameter will need details of your flexible server's subscription and resource group along with the migration name you want to provide for this migration.
$migrationName = "<migrationname>";
$subID = "<subscription ID of flexible server>";
$resourceGroupName = "<resource group name of flexible server";
$flexibleServerName = "<name of flexible server>";
$apiVersion = "2023-03-01-preview";
$url = "https://management.azure.com/subscriptions/" + $subID + "/resourceGroups/" + $resourceGroupName + "/providers/Microsoft.DBforPostgreSQL/flexibleServers/" + $flexibleServerName + "/migrations/" + $migrationName + "?api-version=" + $apiVersion;

$contentType = "application/json"      

$AccessTokenProperty = Get-AzAccessToken;
$AccessToken = $AccessTokenProperty.Token;
$basicAuth = "Bearer $AccessToken"

$headers = @{
    Authorization = $basicAuth
};

#data is the payload we send to the request. This includes details of single server, passwords for source and target and dbs you want to migrate
$data = '{
  "properties" : {
    "sourceDBServerResourceId" : "/subscriptions/<subscriptionID>/resourceGroups/<resource_group_name>/providers/Microsoft.DBforPostgreSQL/servers/<single_server_name>",
    "secretParameters" : {
        "adminCredentials" : {
            "sourceServerPassword" : "<password_of_source>",
            "targetServerPassword" : "<password_of_target>"
        },
    "sourceServerUserName" : "<source_migration_user>",
    "targetServerUserName" : "<target_migration_user"
    },
    "dbsToMigrate" : ["postgres"],
    "migrationMode" : "Offline",
    "overwriteDBsInTarget" : "true"
  }
}'

Invoke-RestMethod -Method PUT -Uri $url -ContentType $contentType -Headers $headers -Body $data;

# the following section will include the tracking part

$trackingURL = $url + "&migrationListFilter=All"
$migrationStatus = "";
# Keep polling for every 60 seconds to check if the migration has completed and print the current migration status
while($migrationStatus -ne "Completed"){
    #invoke the get migration status 
    $Response = Invoke-RestMethod -Method GET -Uri $trackingURL -ContentType $contentType -Headers $headers
    Write-Output $Response.properties
   	$migrationStatus = "Migration Status : " + $Response.properties.currentStatus.currentSubStateDetails.currentSubState;
    Write-Output $migrationStatus;
    if ($migrationStatus -eq "Completed"){
      break;
    }   
    start-sleep -seconds 60
}

Write-Output "Migration Completed"