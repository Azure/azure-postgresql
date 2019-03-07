Param(
   [Parameter(Mandatory= $true, HelpMessage="Enter resource group name for your monitor")]
   [ValidateNotNullorEmpty()]
   [string] $resourceGroupName,
   [Parameter(Mandatory= $true, HelpMessage="Enter the region for your monitor")]
   [ValidateNotNullorEmpty()]
   [string] $resourceGroupLocation,
   [Parameter(Mandatory= $true, HelpMessage="Enter the unique name for your monitor")]
   [ValidateNotNullorEmpty()]
   [string] $functionAppName,
   [Parameter(Mandatory= $true, HelpMessage="Enter either an existing keyvault's name or provide a new name to create a new keyvault to secure your secrets that you'll use for your monitor")]
   [ValidateNotNullorEmpty()]
   [string] $keyVaultName,
   [Parameter(Mandatory= $true, HelpMessage="Enter the email account or accounts separated by ';' that the alerts should be sent to")]
   [ValidateNotNullorEmpty()]
   [string] $mailTo,
   [Parameter(Mandatory= $true, HelpMessage="Enter the email account that the alerts should be sent from")]
   [ValidateNotNullorEmpty()]
   [string] $senderAccount,
   [Parameter(Mandatory= $true, HelpMessage="Enter the smtp server form the senderAccount that you just entered. An example for a live.com or outlook.com account would be smtp.office365.com")]
   [ValidateNotNullorEmpty()]
   [string] $smtpServer,
   [Parameter(Mandatory= $true, HelpMessage="Enter subscription name for your monitor")]
   [ValidateNotNullorEmpty()]
   [string] $subscriptionName="YourDefaultSubscriptionName",
   [Parameter(Mandatory= $true, HelpMessage="Enter the full connection string to the database that you are connecting to in order to monitor. This value will be passed to keyvault as SecureString and will be stored encrypted")]
   [ValidateNotNullorEmpty()]
   [string] $databaseConnectionStringValue,
   [Parameter(Mandatory= $true, HelpMessage="Enter the password for the email account that will send the alert emails. This value will be passed to keyvault as SecureString and will be stored encrypted")]
   [ValidateNotNullorEmpty()]
   [string] $senderAccountsPasswordValue,
   [Parameter(Mandatory= $false, HelpMessage="Enter the secret name that you will store your database connection string in your keyvault")]
   [ValidateNotNullorEmpty()]
   [string] $keyVaultConnectionStringSecretName="pgConnectionString",
   [Parameter(Mandatory= $false, HelpMessage="Enter the secret name that you will store your sender email account's password in your keyvault")]
   [ValidateNotNullorEmpty()]
   [string] $keyVaultSenderAccountSecretName="senderSecret"
)
try{
    #assign a unique name for deployment
    $stamp = Get-Date -Format yyyyMMddHHmmsss -ErrorAction Stop
    $deploymentName= "$functionAppName$stamp"
    $mailToSetting="MAIL_TO=$mailTo"
    $smtpServerSetting="SMTP_SERVER=$smtpServer"
    $connectionStringSecretNameSetting="CONNECTION_STRING_SECRET_NAME=$keyVaultConnectionStringSecretName"
    $senderAccountSecretNameSetting="SENDER_ACCOUNT_SECRET_NAME=$keyVaultSenderAccountSecretName"
    $senderAccountSetting="SENDER_ACCOUNT=$senderAccount"

       
    $logFilePath = "$PSScriptRoot\logs\$deploymentName.txt"
    $templateFilePath="$PSScriptRoot\arm\azuredeploy.json"
    $parameterFilePath="$PSScriptRoot\arm\azuredeploy.parameters.json"
    $error.Clear()

    function log($string, $color)
    {
       $logEntry = "$($(Get-Date).ToString()) :    $string"
       if ($Color -eq $null) {$color = "white"}
       Write-Host $logEntry -foregroundcolor $color
       $logEntry | Out-File -Filepath $logFilePath -append
    }

    $context = Get-AzureRmContext -ErrorAction Stop
    if($context.Name -eq $null)
    {
        Try
        {
            Login-AzureRmAccount -ErrorAction Stop
            
            #find out the current selected subscription
            #Get-AzureRmSubscription | Select Name, SubscriptionId

        }
        Catch
        {
            log "---> Either there is an issue with your login or subscription name provided is invalid. Please try again.\_(ツ)_/" red
            exit
        }
    }

    # select a particular subscription
    Select-AzureRmSubscription -SubscriptionName $subscriptionName -ErrorAction Stop


    #get acceptable locations and validate location parameter
    $locations = Get-AzureRmLocation -ErrorAction Stop|Select Location -ErrorAction Stop
    if($locations.Location -notcontains $resourceGroupLocation)
    {
        log "---> Location provided is not a valid location. Please try again.\_(ツ)_/" red
        exit
    }

    #see if the resource group exists; if not, create it
    $rgResource=Get-AzureRmResourceGroup -Name $resourceGroupName -Location $resourceGroupLocation -ErrorVariable rgNotPresent -ErrorAction SilentlyContinue
    if($rgNotPresent)
    {
        $error.Clear()
        log "---> ResourceGroup does not exist;creating $resourceGroupName in $resourceGroupLocation region" yellow
        $rgResource=New-AzureRmResourceGroup -Name $resourceGroupName -Location $resourceGroupLocation -ErrorAction Stop
        log '---> ResourceGroup successfully created' green
    }
    else
    {log "---> $($rgResource.ResourceId) already exists" green}

    log "---> Creating keyvault if not exists to get the uri for the keyvault specified" yellow
    $kvResource = az keyvault create --name $keyVaultName --resource-group $resourceGroupName | ConvertFrom-Json
    if($? -eq $false){
        throw
    }
    log "---> The keyvault is at $($kvResource.properties.vaultUri)" green
    #function app setting that contains your keyvault uri
    $keyVaultUriSetting="KeyVaultUri=$($kvResource.properties.vaultUri)"

    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #+++++++++++++++++ SET VALUES AS APPROPRIATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #function's app settings for monitor's run interval, queries for 
    #alert condition and the supporting data when alert condition is met
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $cronIntervalSetting="CronTimerInterval=0 */1 * * * *"
    $ifQuerySetting="SENDMAILIF_QUERYRETURNSRESULTS=select * from query_store.qs_view where mean_time > 5000 and start_time >= now() - interval '15 minutes'"
    $thenQueriesSetting="LIST_OF_QUERIESWITHSUPPORTINGDATA={""""LONG_QUERY_PSQL_STRING"""":""""select datname as Database, pid as Process_ID, usename as Username, query,client_hostname,state, now() - query_start as Query_Duration, now() - backend_start as Session_Duration from pg_stat_activity where age(clock_timestamp(),query_start) > interval '5 minutes' and state like 'active' and usename not like 'postgres' order by 1 desc;"""",""""LIST_OF_PROCESSES"""":""""select now()-query_start as Running_Since,pid,client_hostname,client_addr, usename, state, left(query,60) as query_text from pg_stat_activity;""""}"
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #Note that you can always update these after deployment. If you are directly updating queries in the portal, enter double quotes as is
    #i.e instead of """"LONG_QUERY_PSQL_STRING"""" , just enter "LONG_QUERY_PSQL_STRING" in Azure portal's function app settings interface
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    #deploy function and update the settings
    $parameters = $parameterFilePath
    $parametersOverride = '{\"appName\": {\"value\": \"functionAppName\"}}' -replace "functionAppName",$functionAppName
    az group deployment create --name $deploymentName --resource-group $resourceGroupName --template-file $templateFilePath --parameters $parameters --parameters $parametersOverride --verbose
    if($? -eq $false){
        throw
    }
    log "---> Deploying monitoring function via deployment $deploymentName" yellow
    Write-Host "Script root is $PSScriptRoot"
    $functionAppDeployment = az functionapp deployment source config-zip -g $resourceGroupName -n $functionAppName --src "$PSScriptRoot\PollPg\zip\Alert.zip" --verbose | ConvertFrom-Json
    if($? -eq $false){
        throw
    }
    log "---> Updating configuration settings. You can check the latest deployment status and logs from $($functionAppDeployment.url)" yellow

    $functionAppAppSettings = az functionapp config appsettings set --resource-group $resourceGroupName --name $functionAppName  --settings $cronIntervalSetting $ifQuerySetting $thenQueriesSetting $keyVaultUriSetting $mailToSetting $smtpServerSetting $connectionStringSecretNameSetting $senderAccountSecretNameSetting $senderAccountSetting 
    if($? -eq $false){
        throw
    }
    log "---> App configuration settings updated" green

    log "---> Getting the system assigned identity for the function" yellow

    #get principal id of function app. assign option will create if no system assigned identity exists or return existing one
    $functionAppIdentity = az functionapp identity assign --name $functionAppName --resource-group  $resourceGroupName | ConvertFrom-Json
    if($? -eq $false){
        throw
    }
    $principalId = $functionAppIdentity.principalId
    log "---> App identity assigned for principal $principalId" green

    #ensure that keyvault properly propagated before setting up the necessary policies and secrets
    do
    {
        log "---> Polling keyvault $keyVaultName" yellow
        $kvShowResult = az keyvault show --name $keyVaultName
        if($? -eq $false){
            throw
        }
    } while ($kvShowResult -eq $null)

    log "---> Keyvault is ready to use" green
    log "---> Adding the system assigned identity for the function to the keyvault to set the appropriate policy" yellow
    $keyVaultPolicyUpdate = az keyvault set-policy --name $keyVaultName --object-id $principalId --secret-permissions get
    if($? -eq $false){
        throw
    }

    log "---> Setting up the required keyvault secrets" yellow

    #adding keyvault secrets as outlined above with temporary values. you will need to update the values to the actual ones as appropriate
    #sample connection string to store
    # Server=YourServerName.postgres.database.azure.com;Database=azure_sys;Port=5432;User Id=YourUser@YourServerName;Password=YourPassword;SslMode=Require;       
    $secretUpdateResult = az keyvault secret set --vault-name $keyVaultName --name $keyVaultConnectionstringSecretName --value $databaseConnectionStringValue
    if($? -eq $false){
        throw
    }
    log "---> A new version for $keyVaultConnectionstringSecretName is successfully created" green

    $secretUpdateResult = az keyvault secret set --vault-name $keyVaultName --name $keyVaultSenderAccountSecretName --value $senderAccountsPasswordValue
    if($? -eq $false){
        throw
    }
    log "---> A new version for $keyVaultSenderAccountSecretName is successfully created" green

    log "---> Script completed. You can go to your function to check or update app settings and validate that monitor is running as expected" green
    log "---> Log is available at $logFilePath"
}
catch{
    log "An error occurred while executing the script: $error" red
}