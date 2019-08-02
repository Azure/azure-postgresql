# Azure Database for PostgreSQL with Nginx


<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithP2S%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png" />
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-postgresql%2Fmaster%2Farm-templates%2FExampleWithP2S%2Ftemplate.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This ARM template deploys [Azure Database for PostgreSQL Server](https://docs.microsoft.com/en-us/azure/postgresql/overview) and [Ubuntu VM](http://releases.ubuntu.com/19.04/) in a VNET. Ubuntu VM is configured with [NGINX](http://nginx.org/) to act as TCP Proxy and forwards all traffic on port 5432 to the PostgreSQL Server. This configuration is useful for Secure On-Prem Connectivity to Azure Database for PostgreSQL Server. 

## Secure Connectivity Architecture

![Secure Connectivity Architecture](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithP2S/secure_connectivity.jpg)


## Deployment and Connectivity

Click on the **Deploy to Azure** button above to deploy the ARM Template **template.json**

Once you have deployed the ARM Template **successfully without any errors**, you will be able to see the psqlCommand as part of Deployment Outputs

![Deployment Outputs](https://raw.githubusercontent.com/Azure/azure-postgresql/master/arm-templates/ExampleWithP2S/output.jpg)


**psqlCommand** provides the psql command to connect the PostgreSQL Server 


```
psql "host={privateIPAddress} port=5432 dbname={your_database} user={your_username}"
```

Example : 

```
psql "host=10.3.0.5 port=5432 dbname=postgres user=pguser@p2sdemoPG"
```

## Contribution 


If you have trouble deploying the ARM Template, please let us know by opening an issue: https://github.com/Azure/azure-postgresql/issues

Feel free to contribute any updates or bug fixes by creating a pull request: https://github.com/Azure/azure-postgresql/pulls

Thank you!

## References 

[Configure a Point-to-Site connection to a VNet using native Azure certificate authentication: Azure portal](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal)

[Use Virtual Network service endpoints and rules for Azure Database for PostgreSQL - Single Server](https://docs.microsoft.com/en-us/azure/postgresql/concepts-data-access-and-security-vnet)

[Module ngx_http_upstream_module](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)

