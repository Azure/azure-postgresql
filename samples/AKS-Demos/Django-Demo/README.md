# Django sample application with Azure Database for PostgreSQL on Azure Kubernetes

**NOTE: Azure Database for Flexible Server is in preview.**

You can use the application in [code](./Code) folder to install a sample Django application on AKS with MySQL Flexible server tutorial. The settings.py file is using **env** variables for database information
The code snippet below is reading the database host , username and password from the Django Kubernetes manifest](/django.yaml) file.

```
DATABASES={
   'default':{
      'ENGINE':'django.db.backends.postgresql_psycopg2',
      'NAME':os.getenv('DATABASE_NAME'),
      'USER':os.getenv('DATABASE_USER'),
      'PASSWORD':os.getenv('DATABASE_PASSWORD'),
      'HOST':os.getenv('DATABASE_HOST'),
      'PORT':'5432',
      'OPTIONS': {'sslmode': 'require'}
   }
}
```

## Build your Docker image

You can build a docker image using [Dockerfile](./Code/Dockerfile).  Deploy your docker image to Docher hub or Azure Container registry.

```
docker build --tag myapp:latest . 
```

Deploy your image to [Docker hub](https://docs.docker.com/get-started/part3/#create-a-docker-hub-repository-and-push-your-image) or [Azure Container registry](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-azure-cli).

## Use the kubernetes manifest to apply 

Use the [django.yaml](./django.yaml) to apply using ```kubectl```. Replace``` [DOCKER-HUB-USER/ACR ACCOUNT]/[YOUR-IMAGE-NAME]:[TAG]``` with your actual docker image name and tag, for example docker-hub-user/myblog:latest.
Update env section below with your database server information.

Deploy this manifest file using ```kubectl apply -f django.yaml```
