var request = require('request'); //required to call Azure search API
var config = require('./config'); //required to get azure search related parameters
var Payloads = require('./Payloads'); //required to get index schema and sample data

function createIndex() {
     //Function to create index in Azure search service resource.

    //Create URL of  azure search query string using service URL, Index Name and api version.
    var url = config.Azuresearch.serviceURL +
        "/indexes/" +
        config.Azuresearch.indexName +
        "?api-version=" +
        config.Azuresearch.apiVersion;

    //Set the Azure search API key and content type in header of query string.
    var headers = {
        'api-key': config.Azuresearch.apiKey,
        'Content-Type': 'application/json'
    };

    //Merge all the parameters in Query string with index schema as a body.
    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify(Payloads.indexPayload),
        withCredentials: false
    };

    //Call put request to create the index in azure search portal.
    request.put(options, function (error, response, body) {
        console.info("create index result: " + response.statusCode);
        if (response.statusMessage == "Created" && response.statusCode == "201") {
            //After index is created, insert sample data into it.
            insertDataIntoIndex();
        }
    });
}
exports.createIndex = createIndex;

function insertDataIntoIndex() {    
    //Function to insert sample data into Azure search Index

    //Create URL of  azure search query string using service URL, Index Name and api version.
    var url = config.Azuresearch.serviceURL +
        "/indexes/" +
        config.Azuresearch.indexName +
        "/docs/index?api-version=" +
        config.Azuresearch.apiVersion;

    //Set the Azure search API key and content type in header of query string.
    var headers = {
        'api-key': config.Azuresearch.apiKey,
        'Content-Type': 'application/json'
    };

   //Merge all the parameters in Query string with index schema as a body.
    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify(Payloads.indexData),
        withCredentials: false
    };

    //Call post request to insert data into Azure search Index.
    request.post(options, function (error, response, body) {
        console.info("data inserted : " + response.statusCode);       
    });
    
}


function getDataFromIndex(lat, lng, radius, res) {
    //Function to get data from Azure search Index.

    //para lat : Latitude of the searching location.
    //para lng : Longitude of the searching location.
    //para radius: Searching radius in kilometer.
    //para res: To return back the result of the search query

    //Create URL of  azure search query string using service URL, Index Name, api version, latitude, longitude and radius.
    var url = config.Azuresearch.serviceURL + "/indexes/" +
        config.Azuresearch.indexName +
        "/docs?api-version=" +
        config.Azuresearch.apiVersion +
        "&search=*&%24filter=geo.distance(location%2C%20geography'POINT(" + lng + "%20" + lat + ")')%20le%20" + radius + "&%24top=1000"

   //Set the Azure search API key and content type in header of query string.
    var headers = {
        'api-key': config.Azuresearch.apiKey,
        'Content-Type': 'application/json'
    };

    //Merge all the parameters in Query string with index schema as a body.
    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify([]),
        withCredentials: false
    };

    //Call get request to get data from azure search index with given parameters.
    request.get(options, function (error, response, body) {
        console.info("get data from index: " + response.statusCode);        
        var responseData = JSON.parse(response.body).value;
        return res.json(responseData);
    });

}
exports.getDataFromIndex = getDataFromIndex;



