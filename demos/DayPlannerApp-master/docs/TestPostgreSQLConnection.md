# Test PostgreSQL Connection

1. Go to <a href="https://portal.azure.com">Azure Portal</a>.	

1. Search for the resource group that you created using ARM Template.

    ![](img/image-5.png)

1.	Click on the AzureDB for PostgreSQL managed service, and then you can view the over view of __PostgreSQL__ Database. 

    ![](img/image-1.png)

1.	Click on the `Alert Rules` present on left side panel. 

    ![](img/image-21.png)

1.	There are two `Alert Rules` created while deploying with ARM Template.
      - __CPU-Alert:-__ This is a CPU usage based alert with a threshold of 80% over an evaluation window of 5 minutes. If the condition is violated the alert will transition to an “Active” state and when the alert condition is resolved the alert rules gets back to `Non-Activated or Warning` states.  Each data point for CPU percentage is an average value over the last five-minute period. In the backend, the alerting engine evaluates each data point and triggers a state change event when a condition is violated or resolved.
       
      - __Storage-Alert: -__ This is a Storage based alert over an evaluation window of 5 minutes and if the Storage goes above 80%, the alert triggers.

    ![](img/image-22.png)

1.	Click on the `Connection String` present on left side panel.
    ![](img/image-40.png)

1.	After clicking on it on the right-side panel different __connection strings__ are visible.  As we know, every language has its own syntax, so azure provides the correct syntax for connecting the __PostgreSQL__ database with related languages.<br/>
    As we deploy our app with __NodeJS__ language, and the correct format of the connection string is given on the right-side panel. We are using this format to connect our NodeJs app with PostgreSQL database.<br/>
    __Basic Syntax:-__

      > postgres://[username]:[password]@[host]:[port]/[database]?ssl=true <br/>

    Above is the basic syntax of `Connection String`. 

    ![](img/image-41.png)

1. Download <a href="https://www.pgadmin.org/download/">pgAdmin-3</a> for connecting the Server database on your local machine for testing the database connection.

1. Open the pgAdmin-3 to connect ServerDatabase on local environment. 

    - Name:- AzurePostgreSQLDatabase 
    - HostName:- postgresqliugazasuoohwq.postgres.database.azure.com 
    - Username:- postgres@postgresqliugazasuoohwq 
    - Password:- pg@12345  

    ![](img/image-2.png)

1. After successful connection, the `AzurePostgreSQLDatabase` server will be visible on pgAdmin-3.

    ![](img/image-3.png)

1.	The Server will contain `dayplanner` database at first which gets created during deployment. The first time that you run the Day Planner app then `engagements` table with sample data with current date will be created. 

    ![](img/image-4.png)

1.	The schema of `engagements` table is as follows.
    
    Column Name | Data Type | Description
    ------------ | ------------- | -------------
    loc_id | serial | Unique id of engagement with auto-increment feature
    loc_name | character varying(255) | Location address of engagement 
    title | character varying(255) | Subject of engagement
    date | date | Date of engagement
    start_time | time without time zone | Start time of engagement
    end_time | time without time zone | End time of engagement
    location | geography(Point) | latitude and longitude of engagement with PostGIS features

1.	To view all records in the `engagements` table follow the following steps:-
      -  Right click on `engagements` table.
      -  After that, click on the `View Data`.
      -  Now click on `View All Rows`.

    ![](img/image-42.png)

1.	Now you can see all records present on the `engagements` table.

    ![](img/image-43.png)

1.	To perform the crud operation like `select`, `insert`, `update`, `delete` and so on.... on the `engagements` table, all we need is __query-tools__.<br/>
    To open __query-tools__ click on the __SQL__ icon present on the `pg-admin 3`.

    ![](img/image-44.png)

1.	Write the actual query in the __query-tools__ box and press the run button(highlighted in the image) to run the written query.
    
    ![](img/image-45.png)

1.	The result of the query is shown below the __query-tool__ box. 
    
    __Basic Query :-__
    ```sql
    select array_to_json(array_agg(row_to_json(t))) as meeting_data
    from (select loc_id, loc_name, title, date, to_char(start_time::time, 'HH12:MI AM') as start, to_char(end_time::time, 'HH12:MI AM') as end, ST_AsGeoJSON(location)::json As geometry
    from engagements
    where date = '<date_of_engagement>'
    ORDER BY start_time )
    as t;
    ```

    ![](img/image-46.png)



