# Azure Database for PostgreSQL with Diagnostic Settings


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%ExampleWithDiagnosticSettings%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%ExampleWithDiagnosticSettings%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>


This ARM template enables query store and deploys [diagnostic settings in Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/samples/resource-manager-diagnostic-settings) for [Azure Database for PostgreSQL Server](https://docs.microsoft.com/azure/postgresql/overview), and send logs and metrics to Azure Monitor Logs workspace, storage account, and Event Hub.

**NOTE**:

For query Store logs, you need to first turn on [Query store parameters](https://docs.microsoft.com/azure/postgresql/concepts-query-store#enabling-query-store).