import requests
from pprint import pprint
import psycopg2
import psycopg2.extras

# Update with connection string information obtained from the Azure portal
host = "<your server>.postgres.database.azure.com" 
user = "<user@servername>"
dbname = "postgres"
password = "**********"
sslmode = "require"

# replace this with your key, obtained from the Text Analytics API Keys
subscription_key = "****************************"
assert subscription_key

# update this to match the endpoint of your api
text_analytics_base_url = "https://southeastasia.api.cognitive.microsoft.com/text/analytics/v2.0/"


def get_documents():
    '''Selects the id and text from the Postgres database
    Returns a nested dictionary with a documents key that can be passed to the API 
    '''
    documents = {}
    doc_array = []
    minidoc = {}

    # query database and get the complaints
    conn = None
    try:
        conn_string = "host={0} user={1} dbname={2} password={3} sslmode={4}".format(host, user, dbname, password, sslmode)
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()

        cur.execute("SELECT complaint_id, consumer_complaint_narrative FROM card_complaints WHERE consumer_complaint_narrative IS NOT NULL LIMIT 25;")
        row = cur.fetchone()


        # store each complaint in the minidoc dictionary, matching the Cognitive Services API request format
        while row is not None:
            minidoc['language'] = 'en'
            minidoc['id'] = row[0]
            minidoc['text'] = row[1]
            doc_array.append(minidoc.copy())
            row = cur.fetchone()


        conn.commit()
        cur.close()

        # Alternatively if you want to iterate through the whole dataset use the commented code below instead
        # The iterator numbers 109 and 160 (109*160 = 17440 ~ number of rows in postgres) were determined to be a good granularity
        # while still meeting Text Analytics data limits: https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview#data-limits
        '''
            conn_string = "host={0} user={1} dbname={2} password={3} sslmode={4}".format(host, user, dbname, password, sslmode)
            conn = psycopg2.connect(conn_string)
            cur = conn.cursor()

            cur.execute("BEGIN WORK")
            cur.execute("DECLARE scurs SCROLL CURSOR FOR SELECT complaint_id, consumer_complaint_narrative FROM card_complaints_two")
            
            for i in range(109):
                cur.execute("FETCH FORWARD 160 FROM scurs")
        
                row = cur.fetchone()
                # store each complaint in the minidoc dictionary, matching the Cognitive Services API request format
                while row is not None:
                    minidoc['id'] = row[0]
                    minidoc['language'] = 'en'
                    minidoc['text'] = row[1]
                    doc_array.append(minidoc.copy())
                    row = cur.fetchone()

                documents['documents'] = doc_array
                sentiment = get_sentiment(documents)
                #clean up doc_array
                doc_array = []

                sentiment_to_database(sentiment)

            cur.execute("CLOSE scurs")
            cur.execute("COMMIT WORK")
        '''


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    documents['documents'] = doc_array
    return documents


##############################
# Sentiment
sentiment_api_url = text_analytics_base_url + "sentiment"


def get_sentiment(docs):
    '''Sends the documents to the API for sentiment analysis
    Returns a dictionary of results
    (Read the API reference guide for more info: https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/)
    '''
    headers   = {"Ocp-Apim-Subscription-Key": subscription_key}
    sentiments = None
    try:
        response  = requests.post(sentiment_api_url, headers=headers, json=docs)
        sentiments = response.json()
    except (requests.exceptions.RequestException) as error:
        print(error)
    
    return sentiments



def print_sentiment(sentiments):
    '''Print out the sentiment results from the API'''
    pprint(sentiments['documents'])



def sentiment_to_database(sentiments):
    '''Insert the sentiment results into a table in the Postgres database'''

    # Set up the values to pass to psycopg2's multiple insert function, execute_values
    sql = "INSERT INTO card_complaints_sentiment(complaint_id, sentiment_score) VALUES %s"
    values = sentiments['documents']
    # Template of how to read response from Cognitive Services
    template = "(%(id)s, %(score)s)"

    conn = None
    try:
        conn_string = "host={0} user={1} dbname={2} password={3} sslmode={4}".format(host, user, dbname, password, sslmode)
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        
        # psycopg2 multiple insert function. Inserts sentiments into database
        psycopg2.extras.execute_values(cur, sql, values, template)
        
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()





docs = get_documents()
sentiments= get_sentiment(docs)
print_sentiment(sentiments)
sentiment_to_database(sentiments)
