# Azure Database for PostgreSQL - Query Store Monitoring
Azure Database for PostgreSQL Query Store records how your queries do over time. This information comes handy when you want to be notified of anomalies 
such as long running queries or blocked processes. The following example intends give you a starting point for a near real time monitoring and alerting
mechanism.
## Prerequisites
* [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
* [Install AzureRM](https://www.powershellgallery.com/packages/AzureRM.Resources/6.7.3)

## Getting started
You can clone this repo and make changes to the function code as you wish or you can just deploy via the scripts provided by making the minimum changes that fits to
your environment. 

1. If you choose to deploy with the scripts provided, you will first need to provide some additional information asked by DeployFunction.ps1 script 
In addition, you can update your cron interval, if and then queries before running this script where it says 'SET VALUES AS APPROPRIATE' before you run this statement. 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++ SET VALUES AS APPROPRIATE ++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

We suggest that you define the following values

|Variable|Notes|
|---|---|
|functionAppName|create a function app by this name if it does not already exist|
|keyVaultName|create a keyvault if not exists, else get the uri for the keyvault|
|mailTo|email adress that the alert will go to. Can later be changed from your function's appsettings|
|senderAccount|email address that the alert will be sent from. Can later be changed from your function's appsettings|
|smtpServer|smtp relay to be used. Can later be changed from your function's appsettings|
|databaseConnectionStringValue|you can either provide a temporary value to update it directly in your keyvault if preferred|
|senderAccountsPasswordValue|you can either provide a temporary value to update it directly in your keyvault if preferred|
|cronIntervalSetting|the frequency to run the alert on. Supports the standard cron syntax, e.g. CronTimerInterval=0 */1 * * * * Can later be changed from your function's appsettings|
|ifQuerySetting|replace the query after SENDMAILIF_QUERYRETURNSRESULTS= with your own alert condition. If query returns any rows back, monitor will run then queries and send an email alert. Can later be changed from your function's appsettings|
|thenQueriesSetting|expects a json doc that is in format {""QueryName"":""Query"",""QueryName"":""Query""} after LIST_OF_QUERIESWITHSUPPORTINGDATA= . Can later be changed from your function's appsettings|


2. You will then need to run the following in a command prompt. Please make sure not to run this script from Powershell ISE as it creates complications for $PSScriptRoot value.

```
DeployFunction.ps1
```

You can access the logs from the logs folder where you can find the url for the function deployment url for further information.

## How secure is this?
The script provides you with the means to store your secrets in a keyvault. Your secrets are always encrypted in-transit as well as at-rest. However, the function app 
does access the keyvault over internet. If you want to avoid this and access your secrets over your vnet through the backbone, you will need to configure a vnet for 
both your function app and your keyvault. Please be aware that vnet support of function apps is in preview and is currently only available in eastus. Once the proper
deployment scenarios are supported, we may revisit this script to accommodate this. Until then, you will need to configure vnet manually to accomplish below.

![Query Store Monitoring](https://github.com/chisqrd/qs-monitoring/blob/master/assets/qsmonitoring.png)

## What kind of conditions can I detect?
It would help to understand the data collected by [Intelligent Performance feature](https://docs.microsoft.com/en-us/azure/postgresql/concepts-query-store) to figure out what you can alert on. However, you can take advantage of some of the few obvious cases in the
corresponding app setting of your Azure Function

|Case|Function app settings|Value|
|---|---|---|
|My query 1 executes in more than x milliseconds on average in the last 15 minutes|SENDMAILIF_QUERYRETURNSRESULTS|select * from query_store.qs_view where query_id = 3589441560 and mean_time > 0.0001 and start_time >= now() - interval '15 minutes'|
|Queries with cache hit less than x|SENDMAILIF_QUERYRETURNSRESULTS|select * , shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS as cache_hit from query_store.qs_view where shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) < 0.9|
|Queries with a mean execution time that is more than x milliseconds|SENDMAILIF_QUERYRETURNSRESULTS|select * from query_store.qs_view where mean_time > 5000 and start_time >= now() - interval '15 minutes'|


## Current shortcomings
Please note that this is not a full-fledged alerting solution! Among the missing capabilities that might end up annoying you is the deduplication process in an incident management solution you'd expect.
Choosing your cron interval for the function and choosing a proper lookback period to evaluate your alerting condition will probably help reduce noise level of your monitor until a time we can add such
a capability here.

## Troubleshooting
### I cannot deploy
#### The provided grant has expired...
If you are getting an error like
>Get Token request returned http error: 400 and server response: {"error":"invalid_grant","error_description":"AADSTS50173: The provided grant has expired due to it being revoked.... 

run the following in your command prompt

`az account clear`  
`az login`
#### Script cannot find a file during execution
Please ensure that you are not running in Windows Powershell ISE.

#### Name mismatch issue during deployment
If your function deployment complains about the name mismatch, please ensure what you are providing for functionAppName value and what is in ./arm/azuredeploy.parameters.json as appName is matching

#### WebApp already exists
FunctionApp names have to be universally unique. You can update the deployment on an existing functionapp, provided that you are using the same resourcegroup.

#### Keyvault already exists
Although not required, this script uses the same region same resource group for the keyvault.

### I'd like to check if my function is working
You can locate the log file of your deployment under the ./logs folder. To check whether or not your function is functioning properly, you can go to Azure portal and search for your
function app and locate `PingMyDatabase` function or the name you used if you changed the code. The log stream, if all goes well, should periodically get your secrets from keyvault
and connect to database. If you are seeing errors in the stream refer to this section.
#### No such host is known
Your connection string is most likely malformed. Please ensure that it is in the following format:
`host=yourdbinstance.postgres.database.azure.com;port=5432;database=azure_sys;username=youruser@yourdbinstance;password=yourpassword;sslmode=Require`

### I want to change stuff
You can go to portal and locate your function app. In order to change app settings, locate FunctionAppSettings, click Manage Application Settings and save your settings after your changes


|Case|SettingName|  
|---|---|  
|Frequency of runs|CronTimerInterval|  
|Who to mail to|MAIL_TO|  
|Alert condition|SENDMAILIF_QUERYRETURNSRESULTS|  

#### I just want to deploy a bare function app
If you want to do a simple function app deployment on a standard asp, you can also use below custom template but you will need to deploy the function app from your
solution yourself.

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fchisqrd%2Fqs-monitoring%2Fmaster%2Farm%2Fazuredeploy.json) 
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2Fchisqrd%2Fqs-monitoring%2Fmaster%2Farm%2Fazuredeploy.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

## References
* [How to deploy Azure Functions with zip push](http://www.frankysnotes.com/2018/06/how-to-deploy-your-azure-functions.html)
* [A bit more about zip-file deployments](https://medium.com/@fboucheros/how-to-deploy-your-azure-functions-faster-and-easily-with-zip-push-23e15d79599a)
* If you choose to run the bash script, here is [how to set up your bash in windows to run az cli](https://medium.com/azure-developers/the-ultimate-guide-to-setting-up-the-azure-cli-on-windows-adeda6c6b7e1)