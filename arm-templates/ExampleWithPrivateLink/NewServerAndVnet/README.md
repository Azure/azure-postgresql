# Azure Private Link for Azure Database for PostgreSQL Single server


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPrivateLink%2FNewServerAndVnet%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithPrivateLink%2FNewServerAndVnet%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This ARM template creates the following resources : 

1. [VNET](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)
integrated with a [Private DNS Zone](https://docs.microsoft.com/en-us/azure/dns/private-dns-overview). 

2. Windows Client VM inside the above VNET.

3. [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview)

4. [Azure Private Endpoint](https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview). 
   PostgreSQL Server can be accessed from within the VNET using the Private Endpoint. 


## Azure Private Link

![Architecture](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPrivateLink/NewServerAndVnet/privatelink.jpg)

## Private Endpoint Connectivity Architecture

![PrivateEndpoint](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithPrivateLink/NewServerAndVnet/vnetprivateipoverview.jpg)


## Deployment and Connectivity

Click on the **Deploy to Azure** button above to deploy the ARM Template **parentTemplate.json**

Once you have deployed the ARM Template **successfully without any errors**, you will be able to connect to the PostgreSQL Server from the Client VM using psql command. 

For hostname in the psql command, we can use either the private IP address or the FQDN since the VNET is integrated with Private DNS Zone and we have an A record pointing the FQDN to the Private IP address of the PostgreSQL Server. 

Remote Desktop into the Client VM, install psql and run the following command to connect to the PostgreSQL Server securely : 

```
psql "host={privateIPAddress} port=5432 dbname={your_database} user={your_username} password={your_password} sslmode=require"
```

**Example** : 

```
psql "host=10.1.2.4 port=5432 dbname=postgres user=pguser@pgserver password=PGPASSWORD sslmode=require"
```

```
psql "host=pgserver.postgres.database.azure.com port=5432 dbname=postgres user=pguser@pgserver password=PGPASSWORD sslmode=require"
```

**NOTE** : nslookup pgserver.postgres.database.azure.com will resolve to the private IP address 10.1.2.4 


## Contribution 


If you have trouble deploying the ARM Template, please let us know by opening an issue: https://github.com/Azure/azure-postgresql/issues

Feel free to contribute any updates or bug fixes by creating a pull request: https://github.com/Azure/azure-postgresql/pulls

Thank you!

## References 

[Introducing Private Link for Azure Database for PostgreSQL Single server](https://techcommunity.microsoft.com/t5/azure-database-for-postgresql/introducing-private-link-for-azure-database-for-postgresql/ba-p/1088068)


