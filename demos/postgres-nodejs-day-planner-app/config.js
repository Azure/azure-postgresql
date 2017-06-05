var config = {};

config.Azuresearch = {}

//Azure search API key

config.apiKey = process.env.searchServicePrimaryKey

//Azure search service URL

config.serviceURL = process.env.searchServiceUri

//Azure search index name to be created
config.Azuresearch.indexName = "azure-search-data";

//Azure search serive API version
config.Azuresearch.apiVersion = "2015-02-28-Preview";



config.Postgres = {}
//Postgres database connection string

config.db.connstr = process.env.POSTGRESQLCONNSTR_DefaultConnection;


module.exports = config;
