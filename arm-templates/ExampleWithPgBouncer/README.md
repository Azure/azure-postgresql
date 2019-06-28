# Configuring Connection Pooling using PgBouncer

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPgBouncer%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPgBouncer%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) and [Ubuntu VM](http://releases.ubuntu.com/19.04/). Ubuntu VM is configured with [PgBouncer](https://pgbouncer.github.io/) to manage [connection pooling](https://en.wikipedia.org/wiki/Connection_pool) with the deployed Azure Database for PostgreSQL Server. 

## Benefits of Connection Pooling

[Performance best practices for using Azure Database for PostgreSQL – Connection Pooling](https://azure.microsoft.com/en-us/blog/performance-best-practices-for-using-azure-database-for-postgresql-connection-pooling/)

In PostgreSQL, establishing a connection is an expensive operation. This is attributed to the fact that each new connection to the PostgreSQL requires forking of the OS process and a new memory allocation for the connection. As a result, transactional applications frequently opening and closing the connections at the end of transactions can experience higher connection latency, resulting in lower database throughput (transactions per second) and overall higher application latency. It is therefore recommended to leverage connection pooling when designing applications using Azure Database for PostgreSQL. This significantly reduces connection latency by reusing existing connections and enables higher database throughput (transactions per second) on the server. With connection pooling, a fixed set of connections are established at the startup time and maintained. This also helps reduce the memory fragmentation on the server that is caused by the dynamic new connections established on the database server.

## Introduction to PgBouncer

[PgBouncer](https://pgbouncer.github.io/) is a lightweight connection pooler that can be installed on the virtual machine (VM) running the application. The application connects to the PgBouncer proxy service running locally on the VM while PgBouncer service in-turn connects to the Azure Database for PostgreSQL service using the credentials and configuration settings specified in the **pgbouncer.ini** file. The maximum number of connections and default pool size can be defined in the configuration settings in pgbouncer.ini.

![Connection Pooling](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPgBouncer/pgbouncer.jpg)


## Deployment and Connectivity

Click on the **Deploy** Button to deploy the ARM Template **template.json**

Once you have deployed the ARM Template **successfully without any errors**, you will be able to see the hostname, sshCommand and psqlCommand as part of Deployment Outputs


![Deployment Outputs](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPgBouncer/outputs.jpg)


**hostname** is the Public DNS for the Ubuntu VM hosting pgbouncer

**sshCommand** provides the ssh command to connect to the Ubuntu VM hosting pgbouncer

**psqlCommand** provides the psql command to connect the PostgreSQL Server 


```
psql "host={dnsLabelPrefix}.{region}.cloudapp.azure.com port=5432 dbname={your_database} user={your_username}"
```

Example : 

```
psql "host=pgubuntu.westus.cloudapp.azure.com port=5432 dbname=postgres user=pguser@pgbouncerserver"
```

## Contribution 


If you have trouble deploying the ARM Template, please let us know by opening an issue: https://github.com/Azure/azure-postgresql/issues

Feel free to contribute any updates or bug fixes by creating a pull request: https://github.com/Azure/azure-postgresql/pulls

Thank you!

## References 

[Performance best practices for using Azure Database for PostgreSQL – Connection Pooling](https://azure.microsoft.com/en-us/blog/performance-best-practices-for-using-azure-database-for-postgresql-connection-pooling/)

[PgBouncer Configuration using pgbouncer.ini](https://pgbouncer.github.io/config.html)

[Lightweight connection pooler for PostgreSQL](https://pgbouncer.github.io/)

