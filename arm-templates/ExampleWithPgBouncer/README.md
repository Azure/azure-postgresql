# Configuring Connection Pooling using PgBouncer

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPgBouncer%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPgBouncer%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

PgBouncer is a lightweight connection pooler that can be installed on the virtual machine (VM) running the application. The application connects to the PgBouncer proxy service running locally on the VM while PgBouncer service in-turn connects to the Azure Database for PostgreSQL service using the credentials and configuration settings specified in the pgbouncer.ini file. The maximum number of connections and default pool size can be defined in the configuration settings in pgbouncer.ini.


## Connection Pooling
![Connection Pooling](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPgBouncer/pgbouncer.jpg)



Once you have deployed the ARM Template, you will be able to see the hostname, sshCommand and psqlCommand as part of Outputs : 


![Outputs](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPgBouncer/outputs.jpg)


hostname is the Public DNS name for the Ubuntu VM hosting pgbouncer

sshCommand provides the ssh command to connect to the Ubuntu VM hosting pgbouncer

psqlcommand provides the psql command to connect the PostgreSQL Server 


```
psql "host={dnsLabelPrefix}.{region}.cloudapp.azure.com port=5432 dbname={your_database} user={your_username}"
```

Example : 

```
psql "host=pgbouncervm.westus.cloudapp.azure.com port=5432 dbname=postgres user=azureuser@pgserver"
```


## References 

https://azure.microsoft.com/en-us/blog/performance-best-practices-for-using-azure-database-for-postgresql-connection-pooling/

https://wiki.postgresql.org/wiki/PgBouncer

https://pgbouncer.github.io/config.html

