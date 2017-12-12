# Instructions for Azure Database for PostgreSQL Bookstore Demo

## Goals for the demo
1.	Run a sample Go app from github using local community PostgreSQL
2.	Simple and easy to provision Azure Database for PostgreSQL
3.	Migrate data from local Postgres to Azure simply and with no outage using Attunity
4.	Extend the Go app with intelligence using Cognitive Services (Bing Web Search APIs); visualize with PowerBI


## Downloads
1.	[Download PostgreSQL](https://www.postgresql.org/download/windows/)

2.	[Download Go](https://www.postgresql.org/download/windows/)

3.	[Download Git](https://git-scm.com/download/win)

4.	[Download NPGSQL](https://github.com/npgsql/Npgsql/releases)
(Make sure GAC is selected while installing)

5.	[Download Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/)


## Goal 1: Show local community version of PostgreSQL using a sample GO app from github
1.	git clone https://github.com/GoesToEleven/golang-web-dev.git 
2.	Copy the files in the folder from this demo called “22_delete_modified” into golang-web-dev/044_postgres/22_delete. This includes 
-	templatesb - new html templates. All go files in this folder point to templatesb (instead of templates. You can choose to use either folder)
-	maincs – same as main.go but with connection string for Azure server (local commented out)
-	bingsearch – calls the bing web api
-	mainb – same as maincs.go but with functionality for returning bing web api results into the database table searchinfo
3.	Access local postgres through sql shell
4.	Create a database ‘bookstore’
>>(In the original main.go file, the author, Todd Mcleod, has a user called “bond” with password “password” for the connection to the ‘bookstore.’ You can choose to create this user, or change the connection string in main.go as needed).
5.	Create 'books' schema

        CREATE TABLE books (
        isbn char(50) PRIMARY KEY     NOT NULL,
        title           TEXT    NOT NULL,
        author          TEXT      NOT NULL,
        price         REAL DEFAULT 000.00
        );
6.	Insert book titles

        \COPY books FROM '\goodreads_library_export.csv' WITH (FORMAT csv);
7.	In command line

        go run main.go
>>(This main.go file is found at golang-web-dev\044_postgres\22_delete_modified)
8.	http://localhost:8080/books  to view the web app.

## Goal 2: Simple and easy to provision Azure Database for PostgreSQL
1.	Create an Azure Database for Postgres server which you’ll be migrating to. [Read through the Azure quickstart for setting up a server](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)
2.	Create a ‘bookstore’ database on the server
3.	Create schema for ‘books’ table like you did for local postgres

## Goal 3: Migrate data from local to Azure simply and with no outage using Attunity
Attunity Replicate for Microsoft Migrations is a special offering for Microsoft customers to facilitate the migration from a variety of popular commercial and open-source databases, including PostgreSQL, to the Microsoft data platform.
1.    Install [Attunity Replicate for Microsoft Migrations](https://www.attunity.com/products/replicate/attunity-replicate-for-microsoft-migration/)


2.	Select “Manage Endpoint Connections” to add a source (local postgres) and target (Azure Database for PostgreSQL). Set up a new migration task.
>>[Note: you can disable SSL on the Azure server. Disabling SSL is not recommended, however this saves time if Attunity SSL is not yet set-up.]
3.	Run the migration
4.	Select * from books on the Azure server

>>Now, connect the web app to this new database
5.	The main.cs file has the example below. Replace with the appropriate connection details for your server.


        const (
        // Initialize connection constants.
        HOST = "servername.postgres.database.azure.com"
        DATABASE = "bookstore"
        USER = "user@servername"
        PASSWORD = “*****"
        ) 
        
        var connectionString string = fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=require", HOST, USER, PASSWORD, DATABASE)
        db, err = sql.Open("postgres", connectionString)

6.	In command line 

        go run maincs.go
7.	http://localhost:8080/books


## Goal 4: Extend the GO app with intelligence using Cognitive Services (Bing Web Search APIs); Visualize with PowerBI
The code for this step is in bingsearch.go which calls the bing web api, and mainb.go which inserts the results into a table called searchinfo.
1.	Create ‘searchinfo’ table schema in the Azure Database for Postgres server

        CREATE TABLE SearchInfo (
        isbn char(50) NOT NULL,
        title           TEXT    NOT NULL,
        country         TEXT    NOT NULL,
        hits         BIGINT DEFAULT 0);
2.	In command line 
        
        go run mainb.go bingsearch.go
3.	http://localhost:8080/books 
>>(The demo is currently set up such that the bing web api is called/refreshed when the web app is loaded/reloaded in the browser, and when a new book is inserted from the web app. This functionality can be adjusted to suit your preference).
4.	Select * from searchinfo to view 
5.	Open PowerBI. Connect to Azure Database for Postgres server from “Get Data”
>>Note: instead of (servername).postgres.database.azure.com, PowerBI uses the syntax (servername).database.windows.net to connect. 
6.	Import the searchinfo table
7.	Create a map chart by dragging “country” from Fields to the dashboard. You can select “hits” field which will be used to determine the size of the country circles.

