var config = {};

config.Azuresearch = {}
config.Postgres = {}

//Azure search API key
config.Azuresearch.apiKey = process.env.searchServicePrimaryKey;

//Azure search service URL
config.Azuresearch.serviceURL = process.env.searchServiceUri;

//Azure search index name to be created
config.Azuresearch.indexName = "azure-search-data";

//Azure search serive API version
config.Azuresearch.apiVersion = "2015-02-28-Preview";

//Postgres database connection string
config.Postgres.connstr = process.env.POSTGRESQLCONNSTR_DefaultConnection;
config.Postgres.pgAdminUser = process.env.pgAdminUser;


module.exports = config;
