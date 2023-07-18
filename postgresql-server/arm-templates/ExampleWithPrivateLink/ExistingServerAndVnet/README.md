# Azure Private Link for Azure Database for PostgreSQL Single server


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPrivateLink%2FExistingServerAndVnet%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPrivateLink%2FExistingServerAndVnet%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>


This ARM template deploys [Azure Private Endpoint](https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview) for an existing [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) in an existing [VNET](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)

[Introducing Private Link for Azure Database for PostgreSQL Single server](https://techcommunity.microsoft.com/t5/azure-database-for-postgresql/introducing-private-link-for-azure-database-for-postgresql/ba-p/1088068)

![Architecture](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPrivateLink/ExistingServerAndVnet/vnetprivateipoverview.jpg)