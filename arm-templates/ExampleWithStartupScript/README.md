# Azure Database for PostgreSQL with Initialization Script


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithStartupScript%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithStartupScript%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>


This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) and [Ubuntu VM](http://releases.ubuntu.com/19.04/). Ubuntu VM is used as a client to run the initialization bash script (init.sh) which runs initialization sql script(init.sql) using psql commandline. This initialization sql script can be used to create database, create users, configure roles, create tables, load data, manage extensions .. etc. 

**NOTE** : After successful deployment, you may either use the Ubuntu VM as a PG client VM or delete it. 
