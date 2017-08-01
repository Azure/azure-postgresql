
{
    "name": "azure-search-data",
    "fields": [
         {
                "name": "loc_id",
                "type": "Edm.String",
                "searchable": false,
                "filterable": false,
                "retrievable": true,
                "sortable": false,
                "facetable": false,
                "key": true,
                "analyzer": null
            },
            {
                "name": "name",
                "type": "Edm.String",
                "searchable": true,
                "filterable": true,
                "retrievable": true,
                "sortable": true,
                "facetable": false,
                "key": false,
                "analyzer": null
            },
            {
                "name": "address",
                "type": "Edm.String",
                "searchable": true,
                "filterable": true,
                "retrievable": true,
                "sortable": true,
                "facetable": false,
                "key": false,
                "analyzer": null
            },

            {
                "name": "city",
                "type": "Edm.String",
                "searchable": true,
                "filterable": true,
                "retrievable": true,
                "sortable": true,
                "facetable": false,
                "key": false,
                "analyzer": null
            },
            {
                "name": "country",
                "type": "Edm.String",
                "searchable": true,
                "filterable": true,
                "retrievable": true,
                "sortable": true,
                "facetable": false,
                "key": false,
                "analyzer": null
            },
            {
                "name": "location",
                "type": "Edm.GeographyPoint",
                "searchable": false,
                "filterable": true,
                "retrievable": true,
                "sortable": true,
                "facetable": false,
                "key": false,
                "analyzer": null
            }
    ],
    "scoringProfiles": [],
    "defaultScoringProfile": null,
    "corsOptions":
    {
        "allowedOrigins": ["*"],
        "maxAgeInSeconds": 300
    },
    "suggesters": []
}