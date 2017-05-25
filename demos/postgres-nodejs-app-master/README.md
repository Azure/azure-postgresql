# Day Planner App

## Introduction
Get hands-on and learn how to build and deploy PostgreSQL Database Services and Node.JS appplication on Azure.

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FClick2Cloud%2Fpostgres-nodejs-app%2Fmaster%2Fdeploy%2Fazuredeploy.json" target="_blank">
      <img src="http://azuredeploy.net/deploybutton.png"/>
 </a>

## Pre-requisites for the Lab
If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/en-us/free/?WT.mc_id=A261C142F) before you begin.

## Deployment Instructions
Perform following steps to Deploy Node.js web application in Azure and connect it to PostgreSQL.

1. Click on __Deploy to Azure__ button above. You will be redirected to custom deployment window of Azure Portal.
2. On __Custom deployment__ page, select __Subscription__ type for Web Application deployment in __Basic__ category.
3. Create new or use existing __Resource Group__. An Azure resource group is a logical container into which Azure resources like web apps, databases and storage accounts are deployed and managed. [Learn more here.](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-portal)
4. Select __Location__ from the available locations for web application deployment.
5. Select __App Service Plan__. It is pricing model for hosting application, default value is set to __F1__ which represent free service.
6. The __Repo Url__ is the Github repository url of web application. The default value is set to the current GitHub repository Url which contains sample Node.js application source code which connects with PostgreSQL database created with the ARM template. Leave it as is for this demo
7. Ths __Branch__ is branch name of Github repository where code resides, leave it as is for this demo.

    <img src="https://github.com/Click2Cloud/postgres-nodejs-app/blob/master/public/stylesheets/azure_deploy.png"/>

8. Provide the __Postgre SQL Compute Unit__ or leave it as it. [Learn more about Compute Unit](https://docs.microsoft.com/en-us/azure/postgresql/concepts-compute-unit-and-storage#what-are-compute-units)
9. The __Postgre SQL Storage GB__ is the size of physical memory (in GB) for PostgreSQL Database. [Learn more about Storage Unit](https://docs.microsoft.com/en-us/azure/postgresql/concepts-compute-unit-and-storage#what-are-storage-units)
10. __Administrator Login__ is username for PostgreSQL Database.
11. __Administrator Login Password__ is password for PostgreSQL Database. It must contain character from three of the following categories – English uppercase letters, English lowercase letters, number (0-9), and non-alphanumeric characters (!, $, #, %).
12. Select __Postgre SQL Version__ for PostgreSQL Database.
13. Select __Postgre SQL Location__ from available locations for PostgreSQL Database.
14. Mark Check __I agree to the terms and conditions stated above__ checkbox. 
15. Click on __Purchase__ button.

It will take few minutes to deploy web application and create PostgreSQL Database, after successful deployment you can browse web application.


## Clean up

To clean up the Azure assets:

1. Login to the Azure portal.
2. Delete the resource group created as part of the deployment – It will have the same name as the prefix used as part of the deployment step. Internally this will delete all the child resources created in Azure.
