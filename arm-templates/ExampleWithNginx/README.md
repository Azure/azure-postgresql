# Azure Database for PostgreSQL with Nginx


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithNginx%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithNginx%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>


This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) and [Ubuntu VM](http://releases.ubuntu.com/19.04/). The Ubuntu VM hosts [NGINX](https://www.nginx.com/) and forwards traffic received on port 5432 to the Azure Database for PostgreSQL Server port 5432. 
