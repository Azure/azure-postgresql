# Azure Database for PostgreSQL with CanNotDelete Lock


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%ExampleWithMetricAlert%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%ExampleWithMetricAlert%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This ARM template CPU metrics alert with threshold 80% for [Azure Database for PostgreSQL Server](https://docs.microsoft.com/azure/postgresql/overview) and trigger an email action when the alert is detected.

**NOTE** : 

MetricNamespace for Azure Database for PostgreSQL - Single Server is "**microsoft.dbforpostgresql/servers**".

More information bellow:

* [List of metrics for Azure Database for PostgreSQL - Single Server](https://docs.microsoft.com/azure/postgresql/concepts-monitoring)
* [Metric alert with a Resource Manager template](https://docs.microsoft.com/azure/azure-monitor/platform/alerts-metric-create-templates)
