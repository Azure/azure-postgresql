# Azure Database for PostgreSQL with CanNotDelete Lock


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithLocks%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithLocks%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>


This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) and creates a [CanNotDelete Lock](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-lock-resources) to avoid accidental deletion of the server. 

**NOTE** : To create or delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. More information [here](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-lock-resources#who-can-create-or-delete-locks). 
