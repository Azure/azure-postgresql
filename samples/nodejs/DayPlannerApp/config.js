var config = {};

config.Azuresearch = {}
config.Postgres = {}

//Azure search API key
config.Azuresearch.apiKey = "A9DEC51B0030CA6E8D2504262E78E3E4"//process.env.searchServicePrimaryKey;

//Azure search service URL
config.Azuresearch.serviceURL = "https://gis-serviceznd2vqxpmv7vw.search.windows.net"//process.env.searchServiceUri;

//Azure search index name to be created
config.Azuresearch.indexName = "azure-search-data-test";

//Azure search serive API version
config.Azuresearch.apiVersion = "2015-02-28-Preview";

//Postgres database connection string
//config.Postgres.connstr = process.env.POSTGRESQLCONNSTR_DefaultConnection;
config.Postgres.connstr = "postgres://postgres:postgres@localhost:5432/meetings";
config.Postgres.pgAdminUser = "postgres"//process.env.pgAdminUser;


module.exports = config;
