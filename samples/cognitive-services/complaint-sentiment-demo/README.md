# Sentiment Analysis on Complaint Data 
## Using Microsoft Cognitive Services and Azure Database for PostgreSQL

This demo walks you through how to use the Microsoft Cognitive Services [Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) on a dataset in [Azure Database for PostgreSQL](https://docs.microsoft.com/en-us/azure/postgresql/).
We'll be using the API to get a sentiment score on complaints to the Consumer Financial Protection Bureau. Some scenarios this will allow are
- exploring which company or states have the lowest sentiment in complaints
- having a tactical approach like exploring the issues that have the lowest sentiment first

This demo uses [Sentiment Analysis](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis), but can easily be adapted to include the other prongs of the Text Analytics API like [Language Detection](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-language-detection) and [Key Phrases](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-keyword-extraction).


## Azure Database for PostgreSQL
### Pre-requisites
- An Azure Database for PostgreSQL server or [create one](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)
- the postgres terminal [psql](https://www.postgresql.org/docs/9.6/static/app-psql.html) installed on your computer

### Steps
1. Connect to your Azure Database for PostgreSQL server using psql.

2. Download the credit_card_complaints.csv dataset from [data.world](https://data.world/dataquest/bank-and-credit-card-complaints). (You will need to create a free data.world account if you don't already have one. You can use your Github account to create it.)

3. From psql, create a table for the credit card data
```CREATE TABLE card_complaints (complaint_id float PRIMARY KEY,date_received date, product text, sub_product text, issue text, sub_issue text, consumer_complaint_narrative text, company_public_response text, company text, state text, zip_code text, tags text, consumer_consent_provided text, submitted_via text, date_sent date, company_response_to_consumer text, timely_response text, consumer_disputed text);```

4. Upload the complaint data from where you saved it on your computer to postgres using psql's copy function
```\COPY card_complaints (date_received, product, sub_product, issue, sub_issue, consumer_complaint_narrative, company_public_response, company, state, zip_code, tags, consumer_consent_provided, submitted_via, date_sent, company_response_to_consumer, timely_response, consumer_disputed, complaint_id) FROM './Credit_Card_Complaints.csv' WITH CSV HEADER```

5. Create a table for the sentiment data
```CREATE TABLE card_complaints_sentiment (complaint_id float references card_complaints(complaint_id), sentiment_score float);```

### Python and Cognitive Services
This demo uses Python and assumes some familiarity with Python and connecting Python to Postgres. 
You can create a similar demo in the language of your choice; [the Cognitive Services website](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview) has tutorials for a number of popular languages, and so does the Azure Database for PostgreSQL [documentation](https://docs.microsoft.com/en-us/azure/postgresql/connect-nodejs).
#### Pre-requisite
+ [python](https://www.python.org/downloads/) installed
+ [pip](https://pip.pypa.io/en/stable/installing/) package installed

### Steps
1. Upgrade pip with ```pip install -U pip```

2. Install the python postgres driver [psycopg](http://initd.org/psycopg/), and the python http [requests module](http://docs.python-requests.org/en/master/).
```pip install psycopg2 requests```

3. Download csentimentdemo.py from this repo and open the file with your preferred code editor.

4. Fill out the [connection parameters](https://docs.microsoft.com/en-us/azure/postgresql/connect-python#get-connection-information) in the demo code with the valid values for your Azure Database for PostgreSQL server. 

5. Create a [Cognitive Services Text Analytics API resource](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-signup).

6. Get one of your [endpoint keys](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-access-key) and use that to fill in the `subscription_key` parameter in the demo code.

7. Update the region in the `text_analytics_base_url` to match the region you created the API in. You can check the Overview page of the API in the Azure portal to confirm this url.

8. Save your updated demo code and run it.

The code will print out the response from the API using `print_sentiment()`. You can also query the card_complaints_sentiment table in Postgres to see the sentiment scores:
```SELECT * FROM card_complaints_sentiment;```


## Additional Information
If you choose to extend this demo,
- The Cognitive Services Text Analytics API has some data limits. Read about [the limits](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview#data-limits) to understand how this may apply to your scenario.