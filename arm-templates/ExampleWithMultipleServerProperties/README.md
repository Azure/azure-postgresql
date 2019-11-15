# Azure Database for PostgreSQL with Multiple Properties

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithMultipleServerProperties%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithMultipleServerProperties%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/azure/postgresql/overview) and creates a [Firewall Rule](https://docs.microsoft.com/azure/postgresql/concepts-firewall-rules), [Virtual Network Rule](https://docs.microsoft.com/azure/postgresql/concepts-data-access-and-security-vnet), sets server parameters, and creates a database within the server. 

**NOTE** : You can deploy Firewall rules, Virtual Network Rule, server parameters and databases in any order serially. However, they cannot be deployed in parallel. (In ARM templates, when the deployment order is not specified, Resource Manager deploys them in parallel. 
More information on how to specify the deployment order [here](https://docs.microsoft.com/azure/azure-resource-manager/resource-group-define-dependencies).) 