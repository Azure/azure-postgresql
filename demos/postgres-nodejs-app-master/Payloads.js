var config = require('./config');
var payloads = {};

//Create index schema for Azure search. 
payloads.indexPayload =
    {
        "name": config.indexName,
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
    };
//Data to be inserted into Azure search index. 
payloads.indexData =

    {
        "value": [
            {
                "@search.action": "upload",
                "loc_id": "1",
                "name": "Fred Meyer - Redondo #215",
                "address": "25250 Pacific Highway South",
                "city": "Kent,",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2988358, 47.37425613]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "2",
                "name": "QFC-W Lynwood #835",
                "address": "7500-B 196th SW",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3348999, 47.82049942]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "3",
                "name": "Westlake & Thomas - Seattle",
                "address": "330 Westlake Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3381577, 47.62149429]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "4",
                "name": "Safeway - Leavenworth #1589",
                "address": "116 RIVERBEND DR.",
                "city": "Leavenworth",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.6472702, 47.59695435]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "5",
                "name": "Target Richland T-2314",
                "address": "2941 Queensgate Dr",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.313118, 46.25903702]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "6",
                "name": "180th & W Valley Hwy - Kent",
                "address": "18016 71st Ave. S., 101",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2441711, 47.44096375]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "7",
                "name": "Target Renton T-2290",
                "address": "1215 Landing Way",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2003555, 47.49648285]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "8",
                "name": "6607 W. Canal Drive",
                "address": "6607 West Canal Drive, A",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2101669, 46.22631073]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "9",
                "name": "Fred Meyer - Snohomish #681",
                "address": "56th & Bickford Road",
                "city": "Snohomish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1094666, 47.94454956]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "10",
                "name": "820 Ocean Beach Hwy-Longview, WA",
                "address": "808 Ocean Beach Hwy",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9261475, 46.1467514]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "11",
                "name": "Safeway-Sunnyside #563",
                "address": "613 6th St",
                "city": "Sunnyside",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.0137558, 46.32176971]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "12",
                "name": "37th & Grand",
                "address": "3719 S Grand Blvd",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4017944, 47.62055206]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "13",
                "name": "Harbor Station",
                "address": "32650 SR 20, A-107",
                "city": "Oak Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6472015, 48.30305481]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "14",
                "name": "Cedar Plaza- Mountlake Terrace",
                "address": "22805 44th Ave W.",
                "city": "Mountlake Terrace",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.291748, 47.79122162]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "15",
                "name": "QFC - Mt. Lake Terrace #857",
                "address": "22803 44th Avenue W",
                "city": "Mountlake Terrace",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2906952, 47.79086304]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "16",
                "name": "Snoqualmie Ridge- Snoqualmie",
                "address": "7730 Center Blvd. SE, A, Snoqualmie Ridge Retail Center",
                "city": "Snoqualmie",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.8716812, 47.53025818]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "17",
                "name": "QFC - Maple Valley/Wilderness Vlg #",
                "address": "22131 SE 237th",
                "city": "Maple Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0450592, 47.38812256]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "18",
                "name": "Safeway - Port Townsend #538",
                "address": "442 W Sims Way",
                "city": "Port Townsend",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7826233, 48.10807037]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "19",
                "name": "Safeway #307 - Walla Walla",
                "address": "215 E ROSE ST",
                "city": "WALLA WALLA",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.3375397, 46.0701828]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "20",
                "name": "Safeway-Silver Firs #2645",
                "address": "5802 134th Pl SE",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1539612, 47.87563705]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "21",
                "name": "Eastgate-Bellevue",
                "address": "3181 156th Ave SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.134819, 47.58213043]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "22",
                "name": "QFC - Issaquah #821",
                "address": "1540 NW Gilman Blvd",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0603256, 47.54638672]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "23",
                "name": "Vancouver Park Place- Vancouver",
                "address": "8101 NE Parkway Drive, F",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5886307, 45.65472031]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "24",
                "name": "Bridle Trails Center- Kirkland",
                "address": "6617 132nd Ave NE, Bridle Trails Shopping Center",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1658783, 47.66524887]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "25",
                "name": "QFC - West Wood Village #825",
                "address": "2500 SW Barton",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3656616, 47.52223206]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "26",
                "name": "QFC - South Mercer Island #806",
                "address": "8421 S.E. 68th St",
                "city": "Mercer Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.225853, 47.5410347]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "27",
                "name": "Safeway - Shelton #585",
                "address": "600 Franklin Street",
                "city": "Shelton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.1060028, 47.21419907]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "28",
                "name": "QFC - North Shore #831",
                "address": "4101 49th Ave N.E.",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3803558, 47.29382706]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "29",
                "name": "Safeway - Centralia #1495",
                "address": "1129 Harrison Ave",
                "city": "Centralia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9807205, 46.72794724]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "30",
                "name": "SEA SeaTac Concourse C, C12",
                "address": "2580 S 156th St, Seattle-Tacoma International Airport",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3036957, 47.44551468]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "31",
                "name": "W. Sunset Hwy & S Hayford Rd",
                "address": "10510 W. SR2, STE 8",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5562286, 47.64384079]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "32",
                "name": "W. Francis & N. Ash",
                "address": "1704 W Francis",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4366074, 47.71572113]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "33",
                "name": "Fred Meyer-Puyallup #424",
                "address": "17404 Meridian E",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.296875, 47.09869385]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "34",
                "name": "Federal Way Crossing",
                "address": "1401 South 348th Street, M101",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3162918, 47.28939438]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "35",
                "name": "Target Redmond T-995",
                "address": "17700 NE 76th St",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1035538, 47.67250061]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "36",
                "name": "Fred Meyer-Burlington #24",
                "address": "920 S Burlington Blvd",
                "city": "Burlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3342819, 48.46670914]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "37",
                "name": "QFC - Totem Lake #828",
                "address": "11224 N.E. 124th St.",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1911774, 47.7122879]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "38",
                "name": "James Tower",
                "address": "550 17th Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3092499, 47.60705948]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "39",
                "name": "Two Union Square",
                "address": "601 Union Street, 224B",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3330765, 47.6101532]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "40",
                "name": "SE 272nd St & 172nd Ave SE",
                "address": "17313 SE 270th Pl, 102",
                "city": "Covington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1108017, 47.35849762]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "41",
                "name": "Hwy 99 & 185th- Shoreline",
                "address": "18336 Midvale Ave. N., 114",
                "city": "Shoreline",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3444748, 47.76249313]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "42",
                "name": "Safeway - Seattle #1062",
                "address": "4754 42nd Ave SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3848953, 47.55982971]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "43",
                "name": "Bellevue Courtyard",
                "address": "11010 NE 8th St",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1931458, 47.61758804]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "44",
                "name": "Fred Meyer - Tacoma Pacific #385",
                "address": "7250 Pacific Avenue",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4351807, 47.19060898]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "45",
                "name": "Safeway - E Wenatchee #3521",
                "address": "510 Grant Road",
                "city": "E Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.2808609, 47.40489197]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "46",
                "name": "Galbreath Way & Weber",
                "address": "103 W Galbreath Way, 103A",
                "city": "Ritzville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.3675537, 47.11745071]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "47",
                "name": "Downtown Edmonds",
                "address": "502 Main Street",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.377388, 47.8103981]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "48",
                "name": "6th & Sprague - Tacoma",
                "address": "2008 6th Avenue",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4637299, 47.25545502]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "49",
                "name": "QFC-Stanwood #879",
                "address": "27008 92nd Ave NW",
                "city": "Stanwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3583527, 48.2402916]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "50",
                "name": "Safeway - Cheney #1740",
                "address": "2710 First St",
                "city": "Cheney",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5668259, 47.50596237]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "51",
                "name": "132nd & Meridian- Puyallup",
                "address": "10219 132nd Street East, Suite #404",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2923813, 47.13669205]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "52",
                "name": "2nd Street & C Street- Washougal",
                "address": "291 C St, 102",
                "city": "Washougal",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3761063, 45.5814476]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "53",
                "name": "Auburn Way S & M Street",
                "address": "1436 Auburn Way South",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2136536, 47.29468918]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "54",
                "name": "Lynden Retail - Lynden",
                "address": "8082 Guide Meridian Ave, 101",
                "city": "Lynden",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4846115, 48.93427277]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "55",
                "name": "Great Wolf Lodge Grand Mound, WA",
                "address": "20500 Old Hwy 99 SW",
                "city": "Centralia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.0105667, 46.79029465]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "56",
                "name": "College St & Yelm Hwy - Lacey",
                "address": "4700 AVERY LANE SE, Lacey Crossroads",
                "city": "LACEY",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8243561, 46.9990654]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "57",
                "name": "SouthCenter Mall East",
                "address": "1047 Southcenter Mall, Southcenter Mall",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2569275, 47.45822906]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "58",
                "name": "83rd Ave & Steilacoom Blvd",
                "address": "8223 Steilacoom Blvd, Lakewood",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5472946, 47.18011093]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "59",
                "name": "Safeway - Chehalis #3525",
                "address": "1100 S Market Blvd",
                "city": "Chehalis",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9537506, 46.65486145]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "60",
                "name": "Safeway-Grandview #1593",
                "address": "610 E Wine Country Rd",
                "city": "Grandview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.8925552, 46.25550461]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "61",
                "name": "QFC - University Village #807",
                "address": "2746 NE 45th Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2967606, 47.66247559]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "62",
                "name": "QFC - Seattle/Rainier #849",
                "address": "2707 Rainier Avenue South",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2994919, 47.57902145]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "63",
                "name": "Safeway-Kent #792",
                "address": "17051 SE 272nd St",
                "city": "Covingtion",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1144485, 47.35677338]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "64",
                "name": "QFC - Redmond #820",
                "address": "15800 Redmond Way NE",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.128891, 47.67562103]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "65",
                "name": "N. Wenatchee Ave & Maiden Lane",
                "address": "1925 N. Wenatchee Avenue",
                "city": "Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.333931, 47.45303345]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "66",
                "name": "McChord AFB BX",
                "address": "Bldg 504",
                "city": "McChord AFB",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4869995, 47.13259888]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "67",
                "name": "Safeway - Vancouver #1103",
                "address": "6701 East Mill Plain",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6031036, 45.62623215]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "68",
                "name": "Hwy 507 & Creek St SE- Yelm",
                "address": "1406 Yelm Ave E, Suite 1",
                "city": "Yelm",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5903397, 46.93351364]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "69",
                "name": "1202 Wishkah St- Aberdeen",
                "address": "1202 E. Wishkah St.",
                "city": "Aberdeen",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.8028793, 46.97758484]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "70",
                "name": "Safeway - Yakima #1235",
                "address": "2204-A W Nob Hill Blvd",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5393906, 46.58407593]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "71",
                "name": "Safeway - Olympia #1173",
                "address": "1243 Marvin Rd NE",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7664108, 47.05944061]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "72",
                "name": "QFC - Issaquah/Pine Lake #824",
                "address": "2902 228th Ave SE",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0331879, 47.58311081]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "73",
                "name": "QFC Bellevue #808",
                "address": "10116 NE 8th St",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2049713, 47.61830521]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "74",
                "name": "Safeway - Tacoma #1436",
                "address": "1624 72nd St E",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4072647, 47.19032288]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "75",
                "name": "Fred Meyer-Marysville #209",
                "address": "9925 State Ave",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1699524, 48.08510208]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "76",
                "name": "Safeway-Ellensburg #1630",
                "address": "400 N Ruby St",
                "city": "Ellensburg",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5434952, 46.99609375]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "77",
                "name": "Safeway - Redmond #464",
                "address": "17246 Redmond Way NE",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1100082, 47.6713829]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "78",
                "name": "Market & Garland",
                "address": "3907 North Market Street, B",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.365303, 47.69384384]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "79",
                "name": "Safeway - Spokane #342",
                "address": "W 1616 NW Blvd",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4356995, 47.68050385]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "80",
                "name": "Safeway - Aberdeen #1546",
                "address": "221 W Heron St",
                "city": "Aberdeen",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.8185196, 46.97253418]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "81",
                "name": "Gage & Keene Rd",
                "address": "698 Gage Blvd",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2678223, 46.22739029]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "82",
                "name": "Safeway-Yakima #1660",
                "address": "905 E Mead Ave",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.4890366, 46.57831192]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "83",
                "name": "Penn Plaza- Moses Lake",
                "address": "1025  N Stratford Rd, 1, Penn Plaza",
                "city": "Moses Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2777634, 47.14247513]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "84",
                "name": "QFC - Bothell #819",
                "address": "18921 Bothell Way N.E.",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2115479, 47.76529312]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "85",
                "name": "Safeway - Yakima #462",
                "address": "205 N 5th Ave",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5167999, 46.60282516]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "86",
                "name": "Safeway-Juanita #2734",
                "address": "10020 NE 137th St",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2072601, 47.72322464]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "87",
                "name": "145th and Lake City Way",
                "address": "14330 Lake City Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2919006, 47.73295212]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "88",
                "name": "Safeway - Newcastle #558",
                "address": "6911 Coal Creek Pkwy SE",
                "city": "Newcastle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1673508, 47.53949356]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "89",
                "name": "Safeway-Edmonds #1297",
                "address": "23632 SR-99",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3442459, 47.7843399]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "90",
                "name": "Safeway-Everett #1484",
                "address": "4128 Rucker Ave",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2118835, 47.9625473]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "91",
                "name": "116th & Canyon Rd",
                "address": "11601 Canyon Rd East, 100",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3566742, 47.15053177]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "92",
                "name": "Safeway - Vancouver #1611",
                "address": "6711 NE 63rd St",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6036453, 45.6667099]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "93",
                "name": "Safeway-Longview #1078",
                "address": "2930 Ocean Beach Hwy",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9610443, 46.14860153]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "94",
                "name": "QFC - Redmond Ridge #878",
                "address": "23475 NE Novelty Hill Rd",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0260315, 47.69886017]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "95",
                "name": "Safeway - Des Moines #1186",
                "address": "27035 Pacific Hwy S",
                "city": "Des Moines",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3108749, 47.35920715]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "96",
                "name": "Fred Meyer - Bellevue #23",
                "address": "2041 148th NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1439133, 47.62886429]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "97",
                "name": "QFC-North Bend #829",
                "address": "460 E North Bend Way",
                "city": "North Bend",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.7807465, 47.49324417]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "98",
                "name": "QFC-Mercer Island #839",
                "address": "7823 SE 28th",
                "city": "Mercer Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2328796, 47.5851059]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "99",
                "name": "Russell Investments Center-Seattle",
                "address": "1301 2nd Ave, 200",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3379135, 47.60778046]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "100",
                "name": "Safeway-Orting #1844",
                "address": "215 Whitesell St NW",
                "city": "Orting",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2092896, 47.09889984]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "101",
                "name": "Fred Meyer-Veradale #351",
                "address": "15609 E Sprague Ave",
                "city": "Veradale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.1936035, 47.65845871]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "102",
                "name": "W. 27th Ave & Hwy 395",
                "address": "4008 West 27th Ave, 101",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.1755371, 46.18502426]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "103",
                "name": "Center Drive DuPont",
                "address": "1125 Center Drive, 160",
                "city": "Dupont",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6457748, 47.09282684]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "104",
                "name": "Stanwood Town Center",
                "address": "26802 92nd Ave NW",
                "city": "Stanwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.358757, 48.24024582]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "105",
                "name": "Cheney Plaza",
                "address": "2816 First Street, Cheney Plaza",
                "city": "Cheney",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5668106, 47.50705338]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "106",
                "name": "SE 256th Street-Kent",
                "address": "10234 SE 256th Street, 101",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2044601, 47.3727417]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "107",
                "name": "Avondale & 116th - Redmond, WA",
                "address": "11523 Avondale Road, Building B, Suite #102",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0935059, 47.70280838]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "108",
                "name": "QFC - Northgate #866",
                "address": "11100 Roosevelt Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.317482, 47.70913696]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "109",
                "name": "132nd Ave SE & SE Kent Kangley Rd",
                "address": "13121 Kent Kangley Road, 101, Kent Meridian Shopping Center",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1658783, 47.35775375]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "110",
                "name": "North Road 68 & Wrigley Dr",
                "address": "5204 Road 68",
                "city": "Pasco",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.1855164, 46.27383423]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "111",
                "name": "I5 & Cook",
                "address": "9660 Old Hwy 99 North Road, C",
                "city": "Burlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3368378, 48.50531769]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "112",
                "name": "28 E. Main",
                "address": "28 E. Main",
                "city": "Walla Walla",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.3380737, 46.0670166]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "113",
                "name": "4th & Seneca",
                "address": "1125 4th Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3342514, 47.60734177]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "114",
                "name": "Belltown",
                "address": "2326 1st Avenue, Austin - Bell bldg.",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3473129, 47.614048]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "115",
                "name": "196th & 40th",
                "address": "4028 196th Street SW, Ste. A",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2880402, 47.82057571]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "116",
                "name": "QFC - Mill Creek #856",
                "address": "926 164th St",
                "city": "Mill Creek",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2200775, 47.84942245]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "117",
                "name": "MLK Way",
                "address": "2921 Martin Luther King Jr. Wy",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2967453, 47.57696533]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "118",
                "name": "Hazel Dell",
                "address": "7720 N.E. Highway 99, Hazel Dell Fred Meyer",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6624832, 45.67786789]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "119",
                "name": "Seattle Municipal Building",
                "address": "700 5th Ave., 4th floor",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3297348, 47.60474777]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "120",
                "name": "2nd & Madison",
                "address": "1000 Second Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3351288, 47.60535049]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "121",
                "name": "US Bank Centre",
                "address": "1420 Fifth Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3351288, 47.61045074]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "122",
                "name": "Ballard",
                "address": "2200 NW Market Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3850021, 47.66887665]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "123",
                "name": "West Seattle",
                "address": "4101 SW Admiral Way",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3840714, 47.58103561]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "124",
                "name": "26th and Proctor",
                "address": "2602 North Proctor, Suite 100",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4890289, 47.27123642]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "125",
                "name": "Twin Lakes/Fred Meyer",
                "address": "33702 21st Ave SW, #1",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3590622, 47.29854965]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "126",
                "name": "N. 30th & McCarver/Old Town",
                "address": "2112 N. 30th Street, Ste. C",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4646301, 47.2746315]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "127",
                "name": "Dash Point",
                "address": "1656 SW Dash Point Road",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3569107, 47.32264328]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "128",
                "name": "Hawthorne & Nevada",
                "address": "915 East Hawthorne Road",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3960876, 47.75148392]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "129",
                "name": "Safeway-Seattle #3540",
                "address": "21401 Pacific Hwy S",
                "city": "Des Moines",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2990265, 47.41007996]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "130",
                "name": "Southcenter Mall Center",
                "address": "506 Southcenter Blvd., Southcenter Mall",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2589951, 47.45879745]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "131",
                "name": "Safeway-Kirkland #1142",
                "address": "12519 NE 85th St.",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1737137, 47.67886353]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "132",
                "name": "1609 West Dravus",
                "address": "1607 West Dravus Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3780289, 47.6482811]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "133",
                "name": "Tacoma Place",
                "address": "1723 South 72nd Street",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4594879, 47.19218826]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "134",
                "name": "Heritage Place",
                "address": "304 W 8th St, Heritage Place East Building",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6740265, 45.62736511]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "135",
                "name": "Safeway-Woodinville #533",
                "address": "19150 NE Woodinville-Duvall Rd",
                "city": "Woodinville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0809631, 47.7562561]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "136",
                "name": "NE 139th & 20th - Salmon Creek",
                "address": "14300 NE 20th Avenue, 203, Crossroads Center",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6527328, 45.72333908]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "137",
                "name": "Longview/Thriftway",
                "address": "1015 Ocean Beach Hwy, Space 137",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9304733, 46.14587784]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "138",
                "name": "Wilderness Village",
                "address": "22131 S.E. 237th Street",
                "city": "Maple Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0456238, 47.38809967]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "139",
                "name": "Totem Lake West",
                "address": "11400 NE 124th ST, Totem Lake West Shoppkng Center",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1890335, 47.71158218]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "140",
                "name": "208th & Benson/Panther Lk.",
                "address": "10700 SE 208th Street",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.198204, 47.41607666]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "141",
                "name": "University Village",
                "address": "4634 26th Avenue NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2997437, 47.66268539]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "142",
                "name": "University Way",
                "address": "4555 University Wy NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3132935, 47.66284943]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "143",
                "name": "Bear Creek",
                "address": "17196 NE Redmond Wy",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1105881, 47.67263031]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "144",
                "name": "Pine Street",
                "address": "515 Pine Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3357239, 47.61184692]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "145",
                "name": "120th Ave & NE 8th",
                "address": "661 120TH Avenue NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1805954, 47.61608887]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "146",
                "name": "Southcenter",
                "address": "333 Strander Blvd",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2565613, 47.45569229]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "147",
                "name": "Vancouver Mall",
                "address": "8700 NE Vancouver Mall Drive",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5846558, 45.65814972]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "148",
                "name": "Northgate",
                "address": "540 NE Northgate Way",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3215485, 47.70879364]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "149",
                "name": "Richmond Beach",
                "address": "606 NW Richmond Beach Road",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3647079, 47.76580048]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "150",
                "name": "Safeway-Omak #1194",
                "address": "607 Omache Rd",
                "city": "Omak",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.5102234, 48.41809845]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "151",
                "name": "Bothell QFC",
                "address": "18931 Bothell Way NE, #1, Bothell QFC Center",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2113266, 47.76580811]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "152",
                "name": "Civica Office Building",
                "address": "255 108th Ave NE, Civica Office Building",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1966248, 47.61257935]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "153",
                "name": "Safeway-Bremerton #1524",
                "address": "1401 NE McWilliams Rd",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6305466, 47.62113953]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "154",
                "name": "Woodinville",
                "address": "14015 NE 175TH Street",
                "city": "Woodinville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.151741, 47.75344467]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "155",
                "name": "Moses Lake",
                "address": "1790 Kittleson Road NE, B, Moses Lake Freeway Ctr",
                "city": "Moses Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2471085, 47.10143661]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "156",
                "name": "12519 N. Division",
                "address": "12519 N Division St, 7",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4048843, 47.77134705]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "157",
                "name": "Safeway - Arlington #534",
                "address": "3532 172nd Street",
                "city": "Arlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1815414, 48.15163422]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "158",
                "name": "Safeway-Yakima #502",
                "address": "5702 Summitview Ave",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5847397, 46.59906006]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "159",
                "name": "Valley Mall",
                "address": "2409 South First, P-11",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.4832916, 46.56697464]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "160",
                "name": "1102 Supermall Way",
                "address": "1102 Supermall Way SW, Suite 106",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2454987, 47.2960968]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "161",
                "name": "3rd and Pike",
                "address": "221 Pike Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3379059, 47.60951233]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "162",
                "name": "35th and 73rd-Wedgwood",
                "address": "7303 35th Avenue NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2906418, 47.68139648]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "163",
                "name": "QFC-Inglemore #838",
                "address": "14130 Juanita Dr NE",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2434387, 47.72895813]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "164",
                "name": "Safeway-Richland #333",
                "address": "1803 George Washington Way",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2755432, 46.29961777]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "165",
                "name": "Sumner",
                "address": "15005 Main Street East, 101",
                "city": "Sumner",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.229248, 47.20281601]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "166",
                "name": "Safeway-Anacortes #593",
                "address": "911 11th St",
                "city": "Anacortes",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6119003, 48.51260376]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "167",
                "name": "Safeway-Spokane #1242",
                "address": "2509 E 29th Ave",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3744583, 47.62932968]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "168",
                "name": "Pacific Highway & Willow St-Fife",
                "address": "4756 Pacific Highway East, 110",
                "city": "Fife",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3651428, 47.24276733]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "169",
                "name": "Safeway - Burien #1664",
                "address": "138 SW 148th St",
                "city": "Burien",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3361816, 47.47164154]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "170",
                "name": "88th & Andresen Rd - Vancouver",
                "address": "8720 NE Centerpointe Drive, TBD",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6009598, 45.68591309]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "171",
                "name": "1st & Walker-Seattle",
                "address": "1962 1st Ave S.",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3339386, 47.58420181]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "172",
                "name": "Parkland-Tacoma",
                "address": "12821 Pacific Ave S.",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4341736, 47.14060974]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "173",
                "name": "Tulalip",
                "address": "10600 Quil Ceda Blvd, 332, Seattle Premium Outlets",
                "city": "Tulalip",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1886444, 48.0933609]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "174",
                "name": "Fred Meyer-Alderwood, WA #688",
                "address": "2902 164th St SW",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.271553, 47.84784317]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "175",
                "name": "Safeway - Kent #459",
                "address": "20830 108th Ave SE",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.19561, 47.41532135]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "176",
                "name": "Merlot Dr & Wine Country Rd - Pross",
                "address": "10 Merlot Drive, A",
                "city": "Prosser",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.7900467, 46.21933746]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "177",
                "name": "Columbia Tower 40th Floor- Seattle",
                "address": "701 5th Avenue, 4020, Bank of America Tower",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3306961, 47.604599]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "178",
                "name": "Safeway - Milton #3545",
                "address": "900 E MERIDIAN SUITE 12",
                "city": "Milton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2954483, 47.24912262]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "179",
                "name": "Bangor Submarine Base",
                "address": "2600 Ohio Street",
                "city": "Silverdale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7118912, 47.68950272]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "180",
                "name": "Belfair Valley Plaza-Belfair, WA",
                "address": "23965 NE SR3",
                "city": "Belfair",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8240814, 47.45318985]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "181",
                "name": "Target Arlington T-2192",
                "address": "16818 Twin Lakes Ave",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1921844, 48.14937592]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "182",
                "name": "SEA SeaTac CT-26",
                "address": "2580 S 156th St, Seattle-Tacoma International Airport",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3021698, 47.44350052]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "183",
                "name": "168th and Highway 99-Lynnwood",
                "address": "16809 Highway 99, A",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2941895, 47.8460083]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "184",
                "name": "Center St. & Mullen-Tacoma",
                "address": "4802 Center Street, Suite A, Center St & Mullen",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.50177, 47.23405075]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "185",
                "name": "Redmond Ridge",
                "address": "23515 Novelty Hill Rd, D312",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0245667, 47.70023346]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "186",
                "name": "QFC - Issaquah/Klahanie #840",
                "address": "4570 Klahanie Dr SE",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0037613, 47.56590271]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "187",
                "name": "Safeway - Tacoma #1978",
                "address": "2637 North Pearl Street",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5152664, 47.27238464]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "188",
                "name": "Cooper Point Village- Olympia",
                "address": "315 Cooper Point Road NW, 101",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9423065, 47.04783249]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "189",
                "name": "Fred Meyer - Monroe #210",
                "address": "18805 State Route 2",
                "city": "Monroe",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9788742, 47.86143875]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "190",
                "name": "Sequim Village Market Place",
                "address": "1095 W. Washington Street",
                "city": "Sequim",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.1298599, 48.07786179]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "191",
                "name": "QFC-Vancouver #212 (Riverstone)",
                "address": "3505 SE 192nd Ave",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4764786, 45.59475708]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "192",
                "name": "Queensgate & Duportail",
                "address": "2725 Queensgate Dr",
                "city": "W. Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.3101807, 46.2576561]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "193",
                "name": "Safeway #1159 - Newport",
                "address": "121 W. WALNUT",
                "city": "NEWPORT",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.0406265, 48.18347931]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "194",
                "name": "Safeway - Battle Ground #4313",
                "address": "904 West Main Street",
                "city": "Battle Ground",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5466003, 45.78153992]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "195",
                "name": "I-405 & NE 44th- Renton",
                "address": "1785 44th Avenue",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1941071, 47.53195572]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "196",
                "name": "Casino & Evergreen",
                "address": "8407 Evergreen Way, 101",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2272873, 47.92126846]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "197",
                "name": "Canyon Crossing- Frederickson",
                "address": "5602 176th St. East, Building G",
                "city": "Frederickson",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3546524, 47.09608078]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "198",
                "name": "Target Puyallup T-2136",
                "address": "10302 156th St E",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2917328, 47.11318207]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "199",
                "name": "Safeway - Toppenish #584",
                "address": "711 First Ave",
                "city": "Toppenish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.3212051, 46.37612534]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "200",
                "name": "Pacific Ave- Woodland",
                "address": "1999 Pacific Ave",
                "city": "Woodland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7483368, 45.91334915]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "201",
                "name": "Auburn Way & 15th- Auburn",
                "address": "1420 Harvey Rd. NE",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2206955, 47.32107544]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "202",
                "name": "Safeway - 535 Thrasher's Corner",
                "address": "20711 Bothell Everett Hwy",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.205925, 47.80996323]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "203",
                "name": "Safeway - Ephrata  #1544",
                "address": "1150 Basin St NW",
                "city": "Ephrata",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.5583801, 47.3098259]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "204",
                "name": "Safeway-Longview #91",
                "address": "1227 15th Ave",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9386368, 46.13671875]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "205",
                "name": "Safeway-Tacoma #486",
                "address": "3842 Bridgeport Way W.",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5391083, 47.22164536]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "206",
                "name": "Safeway #3228 - Puyallup",
                "address": "5616 176th E",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3546982, 47.09595871]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "207",
                "name": "30th St & Bickford Ave",
                "address": "2623 Bickford Ave., Bldg #9",
                "city": "Snohomish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1080399, 47.94227219]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "208",
                "name": "QFC-West Seattle, WA #883",
                "address": "4550 42nd Ave SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3846817, 47.56128693]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "209",
                "name": "Safeway - Tacoma #1246",
                "address": "6201 6th Ave",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5201797, 47.25639343]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "210",
                "name": "Hwy 410 & 214th - Bonney Lake",
                "address": "21102 Highway 410",
                "city": "Bonney Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1491928, 47.16834259]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "211",
                "name": "Safeway - Spokane #3248",
                "address": "902 W Francis Ave",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4245758, 47.7159996]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "212",
                "name": "QFC-North Towne #859",
                "address": "2636 Bellevue Way NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.201088, 47.6347847]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "213",
                "name": "4th & Diagonal-Seattle",
                "address": "4115 4th Avenue S",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3296432, 47.56656265]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "214",
                "name": "MLK Way & Graham - Seattle",
                "address": "6310 Martin Luther King Jr. Way South",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2851028, 47.54588318]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "215",
                "name": "Safeway - Bellevue #1600",
                "address": "300 Bellevue Way NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2013092, 47.61309814]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "216",
                "name": "Albertsons-Spokane #258",
                "address": "13606 E. 32nd Avenue",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.2224655, 47.62624741]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "217",
                "name": "Albertsons 475 @ Port Orchard",
                "address": "1434 Olney Ave. S. E.",
                "city": "Port Orchard",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6101532, 47.53544235]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "218",
                "name": "Fred Meyer-University Place",
                "address": "6305 Bridgeport Way W",
                "city": "University Place",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5287933, 47.20042419]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "219",
                "name": "3 Bellevue Cntr",
                "address": "601 108th Avenue NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1965332, 47.61594772]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "220",
                "name": "Ballinger Village",
                "address": "20132 Ballinger Way NE, Ballinger Village Shopping Center",
                "city": "Shoreline",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3103561, 47.77598572]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "221",
                "name": "19th & Mildred",
                "address": "1816 S Mildred, Ste 6A, James Center",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5274734, 47.24395752]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "222",
                "name": "QFC-Seattle/Broadway Mkt #887",
                "address": "417 Broadway E",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.321106, 47.62228012]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "223",
                "name": "S. Sammish Way & 36th St",
                "address": "222 36th Street, Sehome Village",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4710846, 48.73116684]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "224",
                "name": "Westlake Center",
                "address": "400 Pine Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3374786, 47.6114502]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "225",
                "name": "Smokey Point",
                "address": "3671 172nd st. NE, Suite 1",
                "city": "Arlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1805344, 48.1526947]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "226",
                "name": "South Mercer Island",
                "address": "8415 SE 68th Street, Suite 100",
                "city": "Mercer Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2257767, 47.54162979]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "227",
                "name": "Houghton Plaza",
                "address": "6733 108th Ave NE",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.196785, 47.66641617]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "228",
                "name": "Olympic Dr NW - Gig Harbor",
                "address": "5001 Olympic Drive NW, Suite 103",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5799179, 47.30440903]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "229",
                "name": "Columbia Center",
                "address": "701 Fifth Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3306732, 47.60427856]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "230",
                "name": "Albertsons 406 @ Gig Harbor",
                "address": "11330 51st Ave NW",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6045456, 47.36088562]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "231",
                "name": "Fred Meyer -Tumwater #659",
                "address": "555 Trosper Rd SW",
                "city": "Tumwater",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9149628, 46.99850082]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "232",
                "name": "Northgate Way",
                "address": "2137  North Northgate Way",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3321075, 47.70824814]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "233",
                "name": "SEA SeaTac Concourse B",
                "address": "2580 S 156th St, Seattle-Tacoma International Airport",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3036957, 47.44218063]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "234",
                "name": "Safeway-Vancouver #4405",
                "address": "408 NE 81st St",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6682434, 45.68161011]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "235",
                "name": "Fred Meyer - Puyallup #265",
                "address": "1100 North Meridian",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2961655, 47.20072937]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "236",
                "name": "Westwood Village",
                "address": "9023 25th Ave SW, Westwood Village",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3655777, 47.52272034]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "237",
                "name": "Fred Meyer-Battleground",
                "address": "401 SW 12th Street",
                "city": "Battle Ground",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5494232, 45.78371048]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "238",
                "name": "Safeway - Seattle #1923",
                "address": "9620 28th Ave SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3670807, 47.51668167]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "239",
                "name": "Safeway-Silverdale #1680",
                "address": "2890 NW Bucklin Hill Rd",
                "city": "Silverdale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6884995, 47.65145111]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "240",
                "name": "Target Federal Way T-1947",
                "address": "2201 SeaTac Mall Blvd",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3050232, 47.31314468]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "241",
                "name": "Target Bonney Lake T-1957",
                "address": "9400 192nd Ave E",
                "city": "Bonney Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1717834, 47.17219162]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "242",
                "name": "Target Issaquah T-996",
                "address": "755 NW Gilman Blvd",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0508652, 47.54227066]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "243",
                "name": "Safeway-Arlington #1522",
                "address": "20500 Olympic Pl",
                "city": "Arlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1278992, 48.18205261]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "244",
                "name": "Pike Place",
                "address": "1912 Pike Place",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3425903, 47.61004639]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "245",
                "name": "Queen Anne",
                "address": "2135 Queen Anne Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3571548, 47.63824844]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "246",
                "name": "Alderwood Mall",
                "address": "3000 184th St SW, #368",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2712555, 47.83013535]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "247",
                "name": "Factoria Village",
                "address": "3560C 128th Avenue SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1674805, 47.5782547]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "248",
                "name": "Redmond North",
                "address": "8867 161st Avenue NE",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1259003, 47.68105698]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "249",
                "name": "Sleater-Kinney",
                "address": "700 Sleater-Kinney Road SE, Ste D",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8319855, 47.04121399]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "250",
                "name": "Seattle Center",
                "address": "305 Harrison Street, Suite 220",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3509369, 47.62110901]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "251",
                "name": "George Washington Wy & McMurray",
                "address": "1759 George Washington Way, Ste B-8",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2757111, 46.29889679]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "252",
                "name": "SODO Lobby",
                "address": "2401 Utah Ave South, First Floor Lobby",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3352432, 47.5807724]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "253",
                "name": "Station Drive DuPont",
                "address": "1100 Station Drive",
                "city": "DuPont",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6229095, 47.0947876]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "254",
                "name": "Safeway-Marysville #1485",
                "address": "1258 State Ave",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1753998, 48.06328583]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "255",
                "name": "Safeway-Port Angeles #1492",
                "address": "110 E 3rd St",
                "city": "Port Angeles",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.4348145, 48.11603546]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "256",
                "name": "72nd & Tieton",
                "address": "420 South 72nd Ave, Orchard Shopping Center",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.604805, 46.59324265]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "257",
                "name": "Fred Meyer - Issaquah #658",
                "address": "6100  East Lake Sammamish SE",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.039444, 47.54854584]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "258",
                "name": "Issaquah Meadows",
                "address": "1460 NW Gilman Blvd, Ste K1",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0595627, 47.54592514]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "259",
                "name": "3rd & Madison",
                "address": "999 Third Avenue, First Interstate Center",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3343735, 47.60528564]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "260",
                "name": "Safeway-Vancouver #1704",
                "address": "6700 NE 162nd Ave. Suite 500",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5075912, 45.67092514]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "261",
                "name": "Albertsons-Clarkston #241",
                "address": "400 Bridge St",
                "city": "Clarkston",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.0419006, 46.42035294]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "262",
                "name": "Overlake",
                "address": "2020 - 148th Ave NE",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1411133, 47.62816238]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "263",
                "name": "Puyallup",
                "address": "4423 S Meridian Street",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2917328, 47.14984894]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "264",
                "name": "Overlake Village",
                "address": "15000 NE 24th Street",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.140564, 47.6324234]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "265",
                "name": "Issaquah Commons",
                "address": "725 NW Gilman Blvd",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0475922, 47.54169464]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "266",
                "name": "Carnation",
                "address": "31722 Eugene Street, #8",
                "city": "Carnation",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9157944, 47.64694977]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "267",
                "name": "Coal Creek Village",
                "address": "6977 Coal Creek Parkway SE",
                "city": "Newcastle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1664352, 47.5382843]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "268",
                "name": "56th & Summitview Ave",
                "address": "5621 Summitview Ave., Chalet Mall",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5848389, 46.60083008]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "269",
                "name": "Murphys Corner/Frd Myr",
                "address": "12906 Bothell-Everett Hwy",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.20858, 47.87952423]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "270",
                "name": "4th & Meeker",
                "address": "425 West Meeker",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2371674, 47.38162994]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "271",
                "name": "Lund & Cathie / Pt.Orchard",
                "address": "1960 SE Lund St",
                "city": "Port Orchard",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6271896, 47.51919174]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "272",
                "name": "Safeway-Seattle #1551",
                "address": "1410 E John St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3130875, 47.62042236]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "273",
                "name": "Woodinville at Garden Way",
                "address": "13780 N.E. 175th Street, Suite 110",
                "city": "Woodinville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1554337, 47.75467682]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "274",
                "name": "1217 N. Hamilton",
                "address": "1217 N. Hamilton",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3967285, 47.66905975]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "275",
                "name": "Ferndale Haggens",
                "address": "1815 Main Street",
                "city": "Ferndale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5808258, 48.84341431]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "276",
                "name": "City Center - Bellevue",
                "address": "500-108th Avenue NE, Suite 1A1",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.196022, 47.61501694]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "277",
                "name": "Phinney Ridge",
                "address": "316 N. 67th Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3545685, 47.6778717]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "278",
                "name": "Tumwater",
                "address": "5312 Little Rock Road SW, Fred Meyer Center",
                "city": "Tumwater",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9161072, 46.9988327]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "279",
                "name": "Safeway-Salmon Creek #1842",
                "address": "12909 NE 99",
                "city": "Salmon Creek",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.649704, 45.71543121]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "280",
                "name": "Safeway-Spokane #1799",
                "address": "3919 N Market St",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3668289, 47.69412613]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "281",
                "name": "Capitol Hill",
                "address": "434 Broadway Ave E",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3206558, 47.62298965]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "282",
                "name": "Wallingford",
                "address": "2110 North 45th",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3330841, 47.6615181]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "283",
                "name": "Silverdale",
                "address": "10516 Silverdale Way NW, Ste 126",
                "city": "Silverdale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6854019, 47.6588707]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "284",
                "name": "E. Olive Way",
                "address": "1600 E Olive Wy",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3249664, 47.61937714]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "285",
                "name": "North Mercer Island",
                "address": "7695 SE 27th Street",
                "city": "Mercer Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2352829, 47.58656311]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "286",
                "name": "Burien Plaza",
                "address": "116 SW 148th Street, D-210, Burien Plaza",
                "city": "Burien",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3349152, 47.47128677]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "287",
                "name": "Heritage Village",
                "address": "9335 N Newport Highway, Suite A, Heritage Village Shopping Center",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4094086, 47.74258423]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "288",
                "name": "Capital Mall",
                "address": "625 Black Lake Boulevard, Suite 165, Capital Mall",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9339752, 47.04191208]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "289",
                "name": "132 E Holly-Bellingham",
                "address": "132 E. Holly St",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4784393, 48.74913025]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "290",
                "name": "East Lake Samm.Cntr",
                "address": "6170 E Lake Sammamish Pkwy SE, East Lake Sammamish Center",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0393143, 47.54734039]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "291",
                "name": "2nd & Division",
                "address": "172 S. Divison Street Suite A, A",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4115219, 47.65471649]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "292",
                "name": "2344 Eastlake",
                "address": "2344 Eastlake Ave E",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3256683, 47.64102554]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "293",
                "name": "SE 27th - Mercer Island",
                "address": "7620 SE 27th St",
                "city": "Mercer Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2369003, 47.58700943]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "294",
                "name": "Safeway-Maple Valley #1471",
                "address": "26916 Maple Valley Hwy",
                "city": "Maple Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0186386, 47.36053848]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "295",
                "name": "Bakerview-Bellingham",
                "address": "1031 W. Bakerview Rd",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5087738, 48.78937149]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "296",
                "name": "Safeway-Seattle #1493",
                "address": "4011 S 164th",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2820663, 47.45563126]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "297",
                "name": "Albertsons - Redmond #2072",
                "address": "3925 236th Ave NE",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0262299, 47.64530945]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "298",
                "name": "Alderwood Mall Terrace",
                "address": "3000 184th St SW, Suite #1015",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2748337, 47.82827377]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "299",
                "name": "Safeway-Seattle #1885",
                "address": "516 1st Ave W",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3578033, 47.62377548]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "300",
                "name": "Albertsons 483 @ South Auburn",
                "address": "4010 A St SE",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2275009, 47.27275467]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "301",
                "name": "25th & Main - Vancouver",
                "address": "2420 Main St.",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6716843, 45.63938141]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "302",
                "name": "1200 Westlake Ave",
                "address": "1200 Westlake Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3400497, 47.6299324]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "303",
                "name": "57th & Regal",
                "address": "3007 East 57th, Bay - E",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3658676, 47.60258865]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "304",
                "name": "Snohomish",
                "address": "1101 Avenue D, Building A, Kla Ha Ya Village",
                "city": "Snohomish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0973358, 47.92500687]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "305",
                "name": "Fred Meyer - Orchards #236",
                "address": "7411 NE 117th Ave",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5510254, 45.67665482]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "306",
                "name": "Safeway-Olympia #1464",
                "address": "3215 Harrison Ave",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9423752, 47.04565048]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "307",
                "name": "Fred Meyer - Fisher's Landing #93",
                "address": "16600 SE McGillivray Blvd",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5014191, 45.60551453]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "308",
                "name": "Safeway-Puyallup #2640",
                "address": "13308 Meridian E",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2946777, 47.13542175]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "309",
                "name": "Evergreen Way & 75th",
                "address": "7430 Evergreen Way",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2212906, 47.93042755]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "310",
                "name": "Corson & Michigan - Seattle",
                "address": "5963 Corson Avenue South, Building A, Unit 184",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.322403, 47.54764557]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "311",
                "name": "Harbour Pointe Retail Town Center",
                "address": "10100 Mukilteo Speedway, Harbour Pointe Retail Town Center",
                "city": "Mukilteo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2940521, 47.90612411]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "312",
                "name": "Frontier Village",
                "address": "511 State Road 9 N.E., Ste. A56, Lake Stevens Shopping Center",
                "city": "Lake Stevens",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1053009, 48.00146866]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "313",
                "name": "Redmond Town Center",
                "address": "7425 166th Ave NE, Ste C105",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1200104, 47.6705513]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "314",
                "name": "Ellensburg Campus",
                "address": "908 E. 10th Street",
                "city": "Ellensburg",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5347137, 47.00172806]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "315",
                "name": "Trent & Argonne",
                "address": "8901 E Trent, Suite 114",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.283783, 47.68202209]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "316",
                "name": "23rd & Jackson",
                "address": "2300 South Jackson, Suite A",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3019791, 47.5994339]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "317",
                "name": "Market at Lake Tapps/Bonney Lake",
                "address": "19461 Highway 410 East, A",
                "city": "Bonney Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1700058, 47.16953278]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "318",
                "name": "Kent Kangley & Black Diamond Rd",
                "address": "26910 Maple Valley Hwy  #J",
                "city": "Maple Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0203705, 47.36038589]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "319",
                "name": "Rt. 2 & 522/Monroe",
                "address": "18629 SR 2, Monroe Gateway Plaza",
                "city": "Monroe",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9807053, 47.86234283]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "320",
                "name": "Columbia City",
                "address": "4824 Rainier Ave South",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2852631, 47.55876541]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "321",
                "name": "Lake Stevens",
                "address": "8915 Market Place",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1104355, 47.99863815]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "322",
                "name": "505 Union Stn",
                "address": "505 5th Ave South, 505 Union Station",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3285141, 47.5975914]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "323",
                "name": "Battle Ground",
                "address": "11 N.W. 12th Avenue, 101",
                "city": "Battle Ground",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5487442, 45.78141022]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "324",
                "name": "Factoria Boulevard",
                "address": "3720 SE 128th Street, Loehmann's Plaza",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1689453, 47.57735062]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "325",
                "name": "Chehalis",
                "address": "1531 NW Louisiana Ave",
                "city": "Chehalis",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9794235, 46.67687607]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "326",
                "name": "Lakeland Town Center",
                "address": "1408 Lake Tapps Parkway East, E-101, Lakeland Town Center",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2101822, 47.24445343]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "327",
                "name": "University Village North",
                "address": "2650 NE 49th ST, University Village",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2989731, 47.66440582]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "328",
                "name": "Lake City Way & 120th",
                "address": "12001 Lake City Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2975616, 47.71598434]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "329",
                "name": "N. 40th & River Rd",
                "address": "1208 North 40th, Yakima Fred Meyer",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5635376, 46.62023544]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "330",
                "name": "Safeway-Renton #519",
                "address": "17230 140th SE",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1527863, 47.44717026]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "331",
                "name": "Safeway-Lacey #543",
                "address": "4700 Yelm Rd SE",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8221436, 46.99766922]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "332",
                "name": "Safeway-Yelm #1619",
                "address": "1109 Yelm Ave E",
                "city": "Yelm",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5938187, 46.93386078]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "333",
                "name": "Safeway-Lake Stevens #1803",
                "address": "717 SR-9 NE",
                "city": "Lake Stevens",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1038895, 48.00143814]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "334",
                "name": "Albertsons-Kingston #186",
                "address": "8196 SR 104 & Hansville Road",
                "city": "Kingston",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5406113, 47.81125641]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "335",
                "name": "Safeway-Vancouver #1519",
                "address": "13719 SE Millplain Blvd.",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5309296, 45.61691284]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "336",
                "name": "Welcome Center- Waller Hall",
                "address": "Building 2140-Waller Hall, Starbucks Coffee/AAFES",
                "city": "Fort Lewis",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5970459, 47.08938599]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "337",
                "name": "Gig Harbor North",
                "address": "5151 Borgen Blvd., Gig Harbor North",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6069489, 47.35982895]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "338",
                "name": "NE Stadium Way & N Grand Ave",
                "address": "421 NE Stadium Way, Stadium Way Retail Center",
                "city": "Pullman",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.171608, 46.73880386]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "339",
                "name": "Queen Anne Ave N",
                "address": "425 Queen Anne Avenue N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3569107, 47.62293243]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "340",
                "name": "Ralphs Thriftway-Olympia #664",
                "address": "1908 East 4th Ave.",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8749771, 47.04645538]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "341",
                "name": "Fred Meyer - Longview #185",
                "address": "3184 Ocean Beach Hwy",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9645691, 46.14859772]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "342",
                "name": "Target Vancouver NW T-1883",
                "address": "8801 NE Hazel Dell Ave",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6683502, 45.68622971]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "343",
                "name": "Safeway-Kent #1294",
                "address": "210 Washington Ave S",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2466507, 47.37998581]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "344",
                "name": "4147 University Way Avenue",
                "address": "4147 University Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3133621, 47.65821838]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "345",
                "name": "1700 Canyon Rd",
                "address": "1614 Canyon Rd, 101",
                "city": "Ellensburg",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5422287, 46.97693253]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "346",
                "name": "Fairwood",
                "address": "14022 SE Petrovitsky Rd",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1524582, 47.44588089]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "347",
                "name": "Albertsons-Lynnwood #485",
                "address": "19500 Highway 99",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3164291, 47.82257462]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "348",
                "name": "Highway 99 & 200th - Lynnwood",
                "address": "19931 Highway 99",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3174896, 47.81782913]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "349",
                "name": "37th & Broadway",
                "address": "3625 Broadway, Suite A",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2008514, 47.96928406]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "350",
                "name": "SEA SeaTac Concourse A, Space 2",
                "address": "2580 S 156th St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3003387, 47.44137192]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "351",
                "name": "1616 Bentley Dr",
                "address": "7034 St Hwy 303 NE",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6282883, 47.62667465]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "352",
                "name": "Safeway-Bainbridge Island #1252",
                "address": "253 High School Rd NE",
                "city": "Bainbridge Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5191879, 47.63509369]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "353",
                "name": "Safeway-Renton #1563",
                "address": "200 S 3rd St",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2147675, 47.47996521]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "354",
                "name": "Safeway-Tacoma #1437",
                "address": "1302 S 38th St",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4510269, 47.22296524]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "355",
                "name": "Safeway-Kenmore #3500",
                "address": "6850 NE Bothell Way",
                "city": "Kenmore",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2474747, 47.75896072]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "356",
                "name": "Safeway-Bonney Lake #544",
                "address": "21301 Hwy 410",
                "city": "Bonney Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1452255, 47.16631699]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "357",
                "name": "Safeway-Graham #547",
                "address": "10105 224th St E",
                "city": "Graham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2968521, 47.05404282]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "358",
                "name": "Safeway-Moses Lake #3252",
                "address": "601 S Pioneer Way",
                "city": "Moses Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2686234, 47.13014984]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "359",
                "name": "Safeway-Pullman #2639",
                "address": "430 SE Bishop Blvd",
                "city": "Pullman",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.1780853, 46.71583557]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "360",
                "name": "S 56th & Tacoma Way - Tacoma",
                "address": "3514 South 56th Street",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4834824, 47.20579529]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "361",
                "name": "Safeway-Auburn #531",
                "address": "101 Auburn Way N",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2269669, 47.30634689]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "362",
                "name": "Rose Hill - Kirkland",
                "address": "12209 NE 85th St",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1779556, 47.67902756]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "363",
                "name": "Safeway-Seattle #1845",
                "address": "8704 Greenwood Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3545914, 47.69267654]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "364",
                "name": "1700 Seventh Ave",
                "address": "1700 Seventh Ave, Nordstrom Building",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3358612, 47.61432648]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "365",
                "name": "15838 1st Ave South",
                "address": "15838 1st Avenue South",
                "city": "Burien",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.333519, 47.46096802]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "366",
                "name": "Broadway & Everett Ave",
                "address": "2615 Broadway",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2006836, 47.98254776]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "367",
                "name": "QFC Harvard Market #847",
                "address": "1401 Broadway",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3214722, 47.61356354]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "368",
                "name": "Safeway-Federal Way #1555",
                "address": "1207 S 320th St",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3173981, 47.31399155]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "369",
                "name": "Fred Meyer-Sumner #665",
                "address": "1201 E Valley Ave",
                "city": "Sumner",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2280197, 47.20408249]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "370",
                "name": "340th and Hoyt",
                "address": "34024 Hoyt Road SW, 340 & Hoyt Road",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3813477, 47.29648209]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "371",
                "name": "Mill Creek Town Center",
                "address": "15517 Main Street",
                "city": "Mill Creek",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2203064, 47.85696793]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "372",
                "name": "164th Street Crossing",
                "address": "1330 164th St SW, Suite 100, 164th Street Crossing",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2522049, 47.84943008]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "373",
                "name": "Clearview Plaza",
                "address": "17408 State Route 9 SE",
                "city": "Snohomish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1237717, 47.83877563]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "374",
                "name": "4637 Sunset Blvd.",
                "address": "4637 NE Sunset Boulevard",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1569672, 47.50512695]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "375",
                "name": "1410 Plaza Way",
                "address": "1410 Plaza Way, Suite A",
                "city": "Walla Walla",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.34655, 46.05032349]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "376",
                "name": "Division & Buckeye",
                "address": "2703 N. Division Street",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4115295, 47.68289185]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "377",
                "name": "SEA SeaTac Concourse B, Gate 8",
                "address": "2580 S 156th St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3036575, 47.44138718]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "378",
                "name": "Safeway-Mt Vernon #1472",
                "address": "315 E College",
                "city": "Mount Vernon",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3374176, 48.43732071]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "379",
                "name": "Interurban Ave",
                "address": "13038 Interurban Ave",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2728195, 47.48577499]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "380",
                "name": "Benson Plaza",
                "address": "17901 108th Ave SE",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1974106, 47.44218826]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "381",
                "name": "Safeway - Washougal #1687",
                "address": "3307 Evergreen Way",
                "city": "Washougal",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3347931, 45.5790329]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "382",
                "name": "Columbia Tech Center",
                "address": "530 SE 192nd Avenue, Bldg #1",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4768906, 45.61714554]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "383",
                "name": "Lakewood Mall",
                "address": "6040 Main Street SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5184631, 47.16155243]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "384",
                "name": "12101 Mill Plain Blvd- Vancouver",
                "address": "12101 SE Mill Plain Blvd",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5479355, 45.62002563]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "385",
                "name": "Haggen - Oak Harbor #2124",
                "address": "31565 State Route 20, #1",
                "city": "Oak Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6590195, 48.28924561]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "386",
                "name": "QFC - Mukilteo #832",
                "address": "11700 Mukilteo Speedway",
                "city": "Mukilteo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2876053, 47.89125061]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "387",
                "name": "Target Burlington T-696",
                "address": "199 Cascade Mall Dr",
                "city": "Burlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3385315, 48.46527863]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "388",
                "name": "Highway 512 & South Tacoma Way",
                "address": "10314 S Tacoma Way",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4841614, 47.16326904]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "389",
                "name": "QFC-Edmonds #851",
                "address": "22828 100th Ave W",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3673401, 47.79138565]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "390",
                "name": "Safeway-Duvall #1572",
                "address": "14020 Main St NE",
                "city": "Duvall",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9851685, 47.72628784]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "391",
                "name": "162nd & 18th",
                "address": "1900A NE 162nd Ave.",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5064774, 45.63655853]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "392",
                "name": "Madison Park",
                "address": "4000 East Madison St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2807693, 47.63410187]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "393",
                "name": "Klahanie Village",
                "address": "4566 Klahanie Dr. S.E.",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0038986, 47.56591415]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "394",
                "name": "Downtown Everett",
                "address": "2823 Colby Avenue",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2083282, 47.97976685]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "395",
                "name": "Albertsons 3417 @ Olympia",
                "address": "3520 Pacific Ave SE",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8452225, 47.04314804]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "396",
                "name": "Plaza 88",
                "address": "3701 88th St NE, A",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1807175, 48.07621765]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "397",
                "name": "7th & Pike - Seattle",
                "address": "1524 7th Ave, Elliott Hotel",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3337784, 47.61223602]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "398",
                "name": "37th & Meridian/Puyallup",
                "address": "3705 South Meridian, Suite A",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2924805, 47.15642166]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "399",
                "name": "Albertsons-Battle Ground #592",
                "address": "2108 W. Main St",
                "city": "Battle Ground",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5600281, 45.78150558]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "400",
                "name": "228th & NE 4th - Sammamish",
                "address": "340 228 Ave. NE",
                "city": "Sammamish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0350723, 47.6125946]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "401",
                "name": "6th & Union",
                "address": "1420 5th Ave, City Center",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3339386, 47.61016083]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "402",
                "name": "Swedish Medical Center",
                "address": "1101 Madison Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3241882, 47.60957718]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "403",
                "name": "Fourth & Blanchard",
                "address": "2101 Fourth Avenue, Suite 150",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3423462, 47.61413574]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "404",
                "name": "Redmond Retail",
                "address": "7625 - 170th Ave NE, 101, Redmond Center",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1139908, 47.67078018]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "405",
                "name": "Bremerton Conference Center",
                "address": "80 Washington Avenue",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6251984, 47.56345749]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "406",
                "name": "Greentree Plaza",
                "address": "515 SE Everett Mall Way, A",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2254333, 47.90948486]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "407",
                "name": "Crossroads South",
                "address": "15600 NE 8th Street, Suite E-3",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1307297, 47.61726379]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "408",
                "name": "Fred Meyer - Bellingham #25",
                "address": "800 Lakeway Dr",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4636536, 48.74352264]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "409",
                "name": "Target Kent T-681",
                "address": "26301 104th Ave SE",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.202507, 47.36624146]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "410",
                "name": "Safeway-Wenatchee #1449",
                "address": "501 N Miller St",
                "city": "Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.3240967, 47.4309082]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "411",
                "name": "N. Liberty Lake Rd & E Appleway Ave",
                "address": "1342 North Liberty Lake Road, Liberty Lake Town Center",
                "city": "Liberty Lake",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.1043167, 47.67045593]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "412",
                "name": "Parkway Supercenter",
                "address": "17480 Southcenter Parkway",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2603836, 47.44573975]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "413",
                "name": "North Creek Plaza",
                "address": "18404 120th Avenue NE, 101, North Creek Plaza",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1762619, 47.76135254]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "414",
                "name": "Canyon Park",
                "address": "22833 Bothell Everett Hwy",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2156448, 47.79005051]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "415",
                "name": "Haggen - Olympia",
                "address": "1313 Cooper Point Road",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9408493, 47.03407288]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "416",
                "name": "Tacoma Mall",
                "address": "4502 South Steel Street",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4673538, 47.2157135]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "417",
                "name": "Crossroads",
                "address": "15600 NE 8th",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1309357, 47.61878204]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "418",
                "name": "Key Bank Plaza",
                "address": "1101 Pacific Avenue",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4383621, 47.25324249]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "419",
                "name": "Cordata Village",
                "address": "4285 Guide Meridian",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4867325, 48.79662704]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "420",
                "name": "Gig Harbor",
                "address": "4904 Pt Fosdick Drive NW",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5812378, 47.30282593]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "421",
                "name": "Pioneer Square",
                "address": "102 First Avenue S",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3339996, 47.60159683]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "422",
                "name": "Downtown - Bellevue",
                "address": "626 106TH AVE NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1980515, 47.61645126]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "423",
                "name": "Juanita Village",
                "address": "9721 NE 119th Way, Juanita Village",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2117386, 47.70663452]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "424",
                "name": "Highlands Center",
                "address": "2801 W Clearwater",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.1594162, 46.21207428]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "425",
                "name": "Downtown Olympia",
                "address": "550 Capital Way South, Space C",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9012756, 47.04337311]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "426",
                "name": "Southcenter (B&N)",
                "address": "300 Andover Park W",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.252327, 47.45516968]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "427",
                "name": "Monroe Plaza",
                "address": "19813 State Route 2, Suite E-1",
                "city": "Monroe",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9651871, 47.85955048]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "428",
                "name": "130th & Aurora",
                "address": "13025 Aurora Avenue North",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3454971, 47.72433472]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "429",
                "name": "Highway 99",
                "address": "21920 Highway 99",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3320465, 47.79995728]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "430",
                "name": "Fred Meyer - Ellensburg #652",
                "address": "201 South Water",
                "city": "Ellensburg",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5510254, 46.99113846]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "431",
                "name": "Hawk's Prairie",
                "address": "1401 Marvin Rd NE, #109, Hawk's Prairie Village",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7662888, 47.05940628]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "432",
                "name": "2nd & Lenora",
                "address": "211 Lenora",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3427734, 47.61254883]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "433",
                "name": "Oak Harbor",
                "address": "31239 SR 20, Unit 101, Bayview Plaza Shopping Center",
                "city": "Oak Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6618347, 48.28610992]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "434",
                "name": "320th Street - Federal Way",
                "address": "2032 South 320th St",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.307045, 47.31545639]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "435",
                "name": "Albertsons-Port Orchard #419",
                "address": "5520 Sidney Road",
                "city": "Port Orchard",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6520691, 47.4962616]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "436",
                "name": "145th & 15th",
                "address": "14359 15th Avenue NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3131104, 47.73357773]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "437",
                "name": "Thrashers Crnr",
                "address": "2020 Maltby Road",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.205719, 47.80921936]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "438",
                "name": "Northgate Mall",
                "address": "401 NE Northgate Way",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3254471, 47.70420837]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "439",
                "name": "Leschi",
                "address": "121 Lakeside Ave, Ste F",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2853851, 47.6020813]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "440",
                "name": "Salmon Creek / Fred Meyer",
                "address": "800 N.E. Tenney Rd., #107",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6629486, 45.71977234]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "441",
                "name": "Safeway-Bellevue #490",
                "address": "1645 140th Ave NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1544113, 47.6253891]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "442",
                "name": "Safeway-Kirkland #526",
                "address": "14444 124th Ave NE",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1744232, 47.7324791]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "443",
                "name": "Main & Post",
                "address": "721 W. Main",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4230423, 47.65884018]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "444",
                "name": "Lincoln Plaza",
                "address": "2505 S. 38th Street",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4711456, 47.22290421]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "445",
                "name": "Evergreen Village",
                "address": "1645 140th Avenue N.E., Space A2, Evergreen Village Shopping Center",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1545868, 47.62499237]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "446",
                "name": "SEA SeaTac Relocate of Nr Esplanade",
                "address": "2580 S 156th St, Seattle-Tacoma International Airport",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3031082, 47.44371414]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "447",
                "name": "Safeway-Sequim #1448",
                "address": "680F W Washington",
                "city": "Sequim",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.1172256, 48.08066177]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "448",
                "name": "Barkley Village",
                "address": "2915 New Market Street, Suite 107, Barkley Village II",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4438629, 48.76967239]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "449",
                "name": "1144 Elliott Ave W - Seattle",
                "address": "1144  Elliott Avenue West",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3721008, 47.62982178]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "450",
                "name": "Main St.&Bellevue Way",
                "address": "42 Bellevue Way NE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2007065, 47.61060715]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "451",
                "name": "Roosevelt Square",
                "address": "6417 Roosevelt Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.316391, 47.6756897]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "452",
                "name": "Pine Lake",
                "address": "3016 Issaquah-Pine Lake Road  SE",
                "city": "Sammamish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0339203, 47.58329773]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "453",
                "name": "Poulsbo",
                "address": "19673 7th Ave NE, Ste D",
                "city": "Poulsbo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6399765, 47.74134827]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "454",
                "name": "Lynnwood Square",
                "address": "19720 44TH Avenue W, Suite K",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2930908, 47.81996918]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "455",
                "name": "Carillon Point",
                "address": "2255 Carillon Point",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.206665, 47.65654373]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "456",
                "name": "Commerce Center",
                "address": "11502 SE Mill Plain Blvd.",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5542908, 45.62125015]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "457",
                "name": "Greenlake",
                "address": "7100 E Greenlake Drive N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.325531, 47.68000793]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "458",
                "name": "N. Miller & N. Mission",
                "address": "1134 N. Miller Street, Space A",
                "city": "Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.3264465, 47.43863297]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "459",
                "name": "Aurora Village",
                "address": "1295 North 205th",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3428268, 47.77521133]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "460",
                "name": "Safeway-Tumwater #1503",
                "address": "520 Cleveland",
                "city": "Tumwater",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8978806, 47.01884079]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "461",
                "name": "59 Columbia Pt Drive",
                "address": "59 Columbia Point Drive",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2664185, 46.26299286]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "462",
                "name": "Broadway & Argonne",
                "address": "9119 E Broadway",
                "city": "Spokane Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.2824402, 47.66457367]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "463",
                "name": "N. Indian Trail Rd & W. Barnes Rd",
                "address": "9031 N Indian Trail Rd, Sundance Plaza",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4887009, 47.74046326]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "464",
                "name": "Safeway-Seattle #1965",
                "address": "9262 Rainier Ave S",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2682114, 47.52075195]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "465",
                "name": "Washington Shoe Building",
                "address": "400 Occidental Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3326569, 47.59905624]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "466",
                "name": "Magnolia",
                "address": "3300 W. McGraw St., 100",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3998032, 47.6397171]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "467",
                "name": "Fred Meyer - Spokane #657",
                "address": "400 South Thor St.",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3616638, 47.65273285]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "468",
                "name": "Shoreline - 20121 Aurora Ave N",
                "address": "20121 Aurora Ave N, Suite A",
                "city": "Shoreline",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3463516, 47.77561951]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "469",
                "name": "Safeway-Spokane #3255",
                "address": "933 E Mission Ave",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3950195, 47.67231369]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "470",
                "name": "Sprague & Pine",
                "address": "12328 E. Sprague Ave",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.2385101, 47.65671539]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "471",
                "name": "Safeway-Kent #1966",
                "address": "13101 SE Kent Kangley Rd",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1664581, 47.35678482]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "472",
                "name": "Alderwood Mall Parkway",
                "address": "19220 Alderwood Mall Parkway, 100, Alderwood Mall Parkway",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2713394, 47.82384872]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "473",
                "name": "Safeway-Lynnwood #3523",
                "address": "14826 Hwy 99",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.28405, 47.86362076]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "474",
                "name": "Safeway-Lakewood #1645",
                "address": "10223 Gravelly Lake Dr SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5186386, 47.16386414]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "475",
                "name": "Safeway-Enumclaw #494",
                "address": "152 Roosevelt Ave E",
                "city": "Enumclaw",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9798737, 47.19844055]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "476",
                "name": "Lake Forest Park",
                "address": "17039 NE Bothell Way, Lake Forest Towne Center",
                "city": "Lake Forest",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2802124, 47.75231934]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "477",
                "name": "Pier 55",
                "address": "1101 Alaskan Way, 102",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3397141, 47.60486603]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "478",
                "name": "Safeway-Vancouver #1653",
                "address": "2615 NE 112th Ave",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5567551, 45.64147568]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "479",
                "name": "27th & 67th",
                "address": "6720 Regents  Boulevard W, Regents Plaza",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5272293, 47.23567963]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "480",
                "name": "Pacific Place",
                "address": "600 Pine Street, Ste. 25, Pacific Place",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3356171, 47.61267471]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "481",
                "name": "Highland Marketplace",
                "address": "4710 NE 4th St, C105, Highland Marketplace",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1556168, 47.48863602]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "482",
                "name": "Safeway-Olympia #1952",
                "address": "4230 Martin Way E",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.828949, 47.04978943]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "483",
                "name": "1st & Marion",
                "address": "823 First Ave, Colman Building",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3355865, 47.60383606]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "484",
                "name": "64th & Meeker",
                "address": "1428 West Meeker, 101",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2528915, 47.38086319]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "485",
                "name": "Metropolitan Park",
                "address": "1730 Minor Avenue, Suite 102",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3299026, 47.61687469]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "486",
                "name": "Midway Crossing",
                "address": "23325 Pacific Highway South",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2953644, 47.39231873]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "487",
                "name": "Century Square",
                "address": "1501 Fourth Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3375244, 47.61032486]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "488",
                "name": "Plaza 600 Building",
                "address": "600 Stewart Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3368759, 47.61383057]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "489",
                "name": "Westgate",
                "address": "2405 N Pearl St",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5143661, 47.27012634]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "490",
                "name": "Renton Village",
                "address": "601 S. Grady Way, #E",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2114639, 47.47148514]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "491",
                "name": "Univ. of Wash / Tacoma",
                "address": "1748 Pacific Ave",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.437088, 47.24552155]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "492",
                "name": "Mt.Vernon/Haggens",
                "address": "2601 E. Division",
                "city": "Mt Vernon",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3074722, 48.42187881]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "493",
                "name": "Alki Ave.",
                "address": "2742 Alki Ave SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4111557, 47.57883072]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "494",
                "name": "Lakemont / Bellevue",
                "address": "4851 Lakemont Blvd SE, Ste D, Lakemont Village",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1146088, 47.55860519]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "495",
                "name": "2nd & Seneca",
                "address": "1191 2nd Avenue, 2nd & Seneca",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3364944, 47.60641479]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "496",
                "name": "Commercial & 17th/Anacortes",
                "address": "1720 Commercial Avenue, Fidalgo Square",
                "city": "Anacortes",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6128311, 48.50783157]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "497",
                "name": "Holman Road",
                "address": "9999 Holman Rd NW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3639679, 47.70166016]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "498",
                "name": "72nd & Portland Avenue",
                "address": "1621 East 72nd Street, Johnsborough Station",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4069214, 47.19189453]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "499",
                "name": "Albertsons-Millcreek #458",
                "address": "16304 Bothell Everett Highway",
                "city": "Mill Creek",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2197342, 47.85097122]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "500",
                "name": "Valley Mall Pkwy & 5th St NE",
                "address": "500 A Valley Mall Parkway, The Valley Mall Plaza",
                "city": "East Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.2906418, 47.41067886]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "501",
                "name": "North Bend & Mt Si- North Bend",
                "address": "721 SW Mt. Si Blvd, B",
                "city": "North Bend",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.7936096, 47.48750305]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "502",
                "name": "Duvall Commons- Duvall",
                "address": "26304 NE Big Rock Rd, Bldg B",
                "city": "Duvall",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.98629, 47.72813416]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "503",
                "name": "216 W Manson Hwy",
                "address": "216 W Manson Hwy",
                "city": "Chelan",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.0208817, 47.84181213]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "504",
                "name": "112th & 4th Plain- Vancouver",
                "address": "11211 NE 4th Plain Blvd, # 103",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5575027, 45.66574097]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "505",
                "name": "Safeway - Lynden #1930",
                "address": "8071 GUIDE MERIDIAN RD. #101",
                "city": "LYNDEN",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4873123, 48.93434143]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "506",
                "name": "Ellingson Rd- Auburn",
                "address": "4025 A Street SE, Bldg A, Suite 101",
                "city": "Auburn",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2293091, 47.27231598]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "507",
                "name": "Downtown Kirkland",
                "address": "116 Lake Street",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2065125, 47.67584991]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "508",
                "name": "Albertsons - Richland #252",
                "address": "140 W Gage",
                "city": "Richland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2669907, 46.22803879]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "509",
                "name": "North Juanita - Kirkland, WA",
                "address": "13325 100th Ave. NE",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2081909, 47.72013092]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "510",
                "name": "212th & W. Valley Hwy",
                "address": "6719 S 211th St",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2501297, 47.41283035]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "511",
                "name": "Capitol Blvd & Trosper St, Tumwat",
                "address": "5300 Capitol Blvd SE",
                "city": "Tumwater",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9081879, 46.99942017]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "512",
                "name": "QFC - Lynnwood #855",
                "address": "17525-F Highway 99",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2970963, 47.83971786]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "513",
                "name": "Safeway - Puyallup #1798",
                "address": "11501 CANYON RD E",
                "city": "PUYALLUP",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3555984, 47.15213394]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "514",
                "name": "Safeway - Upper Queen Anne #368",
                "address": "2100 Queen Anne Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3562775, 47.63772583]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "515",
                "name": "Safeway - Bremerton #1467",
                "address": "900 North Callow",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6527023, 47.57000351]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "516",
                "name": "2200 Westlake Avenue",
                "address": "2200 Westlake Avenue, 2200 Westlake Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3371506, 47.61819839]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "517",
                "name": "Enumclaw",
                "address": "1343 Garrett Street, A",
                "city": "Enumclaw",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9878159, 47.19999313]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "518",
                "name": "Fred Meyer - Redmond #664",
                "address": "17667 NE 76th St",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1042938, 47.67085266]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "519",
                "name": "Haggens - Bellingham",
                "address": "2814 Meridian Street",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4848099, 48.76762009]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "520",
                "name": "Redmond Way & 158th",
                "address": "15738 Redmond Way, Pad 3, Redmond Center",
                "city": "Redmond",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1288757, 47.67493057]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "521",
                "name": "Fred Meyer - Lacey #186",
                "address": "700 Sleater Kinney Rd SE",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8310013, 47.04114914]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "522",
                "name": "Albertsons 3414 @ Walla Walla",
                "address": "450 N Wilbur Ave",
                "city": "Walla Walla",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.3030396, 46.07672882]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "523",
                "name": "Covington Place",
                "address": "27116 168th Place SE, 101",
                "city": "Covington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1172638, 47.35841751]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "524",
                "name": "GEG Rotunda A/B",
                "address": "9000 West Airport Drive",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5359421, 47.62567139]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "525",
                "name": "GEG C 21",
                "address": "9000 West Airport Drive",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5387573, 47.62388229]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "526",
                "name": "Oregon Way & Industrial- Longview",
                "address": "94 Oregon Way, 100",
                "city": "Longview",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9499054, 46.11657333]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "527",
                "name": "35th & Fauntleroy",
                "address": "4408 Fauntleroy Way SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3770447, 47.56428146]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "528",
                "name": "Safeway - Spokane #1473",
                "address": "EAST 14020 SPRAGUE",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.2162628, 47.65598297]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "529",
                "name": "Bridge Street Plaza- Clarkston",
                "address": "303 Bridge Street, 1",
                "city": "Clarkston",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.0419235, 46.41985703]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "530",
                "name": "Burlington Retail Center",
                "address": "1839 S. Burlington Blvd, 130",
                "city": "Burlington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3369827, 48.4518013]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "531",
                "name": "QFC - Belfair #101",
                "address": "NE 201 State Route 300",
                "city": "Belfair",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8283005, 47.45325851]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "532",
                "name": "Safeway-Monroe #537",
                "address": "19651 SR-2",
                "city": "Monroe",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9676666, 47.8598938]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "533",
                "name": "Safeway - Everett #474",
                "address": "1715 Broadway",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2005768, 47.99428558]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "534",
                "name": "Albertsons - Mt Lake Terrace #414",
                "address": "4301 212th Street SW",
                "city": "Mountlake Terrace",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2905655, 47.80653763]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "535",
                "name": "Alderwood Mall Kiosk",
                "address": "3000 184th St SW, 5559, Alderwood Mall",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2722321, 47.82946396]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "536",
                "name": "QFC-Seattle #805 (Manhattan)",
                "address": "17847 1st Ave S",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3352051, 47.442379]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "537",
                "name": "Safeway-North City #497",
                "address": "17202 15th Ave NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3128204, 47.75459671]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "538",
                "name": "Safeway - Seattle #1143",
                "address": "8340 15th Ave NW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3761902, 47.69018173]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "539",
                "name": "QFC - Seattle/Uptown #881",
                "address": "500 Mercer Avenue",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3472595, 47.62472534]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "540",
                "name": "Plaza 525- Mukilteo",
                "address": "12502 Mukilteo Speedway, A-1",
                "city": "Mukilteo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2816315, 47.88443375]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "541",
                "name": "QFC - Port Hadlock #870",
                "address": "1890 Irondale Road",
                "city": "Port Hadlock",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7584457, 48.03233337]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "542",
                "name": "Fred Meyer-Tacoma #390",
                "address": "4505 S 19th St",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4972839, 47.24369431]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "543",
                "name": "Albertsons 1413 @ Thomas Lake",
                "address": "3322 132nd St SE",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1870499, 47.8769722]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "544",
                "name": "132nd & Seattle Hill RD.-Snohmish",
                "address": "4809 132nd St SE",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1661606, 47.87812042]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "545",
                "name": "Fred Meyer-Port Orchard #655",
                "address": "1900 SE Sedgwick Rd",
                "city": "Port Orchard",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6293716, 47.50325775]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "546",
                "name": "QFC - Meridian #803",
                "address": "13304 S. E. 240th",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1634216, 47.38746262]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "547",
                "name": "Pacific hwy & S 240th",
                "address": "24130 Pacific Highway South, 101",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2964096, 47.38480377]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "548",
                "name": "Safeway - Spokane #1299",
                "address": "10100 N Newport Hwy",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3976364, 47.75028229]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "549",
                "name": "Safeway - Walla Walla #1160",
                "address": "1600 Plaza Way",
                "city": "Walla Walla",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-118.3479156, 46.0488472]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "550",
                "name": "Hwy 99 & Airport Rd - Everett",
                "address": "11802 Evergreen Way",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2577209, 47.89105225]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "551",
                "name": "Marysville Gateway Center",
                "address": "3725 116TH ST NE",
                "city": "MARYSVILLE",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1809311, 48.10029984]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "552",
                "name": "QFC-Bellevue #874 (Bel-East)",
                "address": "1510 145th Pl SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1487732, 47.59672165]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "553",
                "name": "Lakewood Crossing - Marysville",
                "address": "17101 27th Avenue NE, A",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1932373, 48.15129471]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "554",
                "name": "303 River Rd - Puyallup",
                "address": "303 River Rd",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2971039, 47.1999855]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "555",
                "name": "Safeway - Port Angeles #1922",
                "address": "2709 E. HIGHWAY 101",
                "city": "Port Angeles",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.379982, 48.10570526]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "556",
                "name": "Safeway - Seattle #1477",
                "address": "1423 NW Market St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3743896, 47.66856384]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "557",
                "name": "South Hill",
                "address": "2525 E 29th Avenue",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.37323, 47.6285553]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "558",
                "name": "Sammamish Highlands",
                "address": "604 228th Ave NE",
                "city": "Sammamish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0337372, 47.61479187]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "559",
                "name": "California & Fauntleroy",
                "address": "6501 California Ave, (new address is across the street)",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3875198, 47.54462814]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "560",
                "name": "Bellevue",
                "address": "10214 NE 8th",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2039566, 47.61772919]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "561",
                "name": "Oak Tree",
                "address": "10002 Aurora Avenue North",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3439026, 47.70231247]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "562",
                "name": "SEA SeaTac North Satellite, Gt N-12",
                "address": "2580 S 156th St, Seattle-Tacoma International Airport",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3020248, 47.44838333]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "563",
                "name": "Albertsons 3106 @ Puyallup",
                "address": "11012 Canyon Road E.",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3588867, 47.15590286]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "564",
                "name": "Wellesley & Belt",
                "address": "2401 West Wellesley",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4472275, 47.6993866]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "565",
                "name": "Centralia Mrkt Sq.",
                "address": "1161 Harrison Ave., Centralia Market Square",
                "city": "Centralia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9812622, 46.72859573]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "566",
                "name": "Normandy Park",
                "address": "17829 1st Ave South, Manhattan Village Shopping Center",
                "city": "Normandy Park",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3351288, 47.44242477]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "567",
                "name": "Albertsons-Mukilteo #469",
                "address": "12811 Beverly Park Rd",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2807388, 47.88106918]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "568",
                "name": "12th & Columbia",
                "address": "800 12th Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3165741, 47.60936737]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "569",
                "name": "7750 NE Bothell Way",
                "address": "7750 NE Bothell Way",
                "city": "Kenmore",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2368088, 47.75669479]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "570",
                "name": "506 N. Sullivan",
                "address": "506 N. Sullivan",
                "city": "Veradale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.1958313, 47.66207886]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "571",
                "name": "Ballard/FredMeyer",
                "address": "4400 11th Avenue NW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3690262, 47.66025925]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "572",
                "name": "Safeway - Colville #385",
                "address": "391 North Main St",
                "city": "Colville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.9064713, 48.54755402]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "573",
                "name": "Target Northgate T-1284",
                "address": "302 NE Northgate Way",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3254242, 47.70906067]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "574",
                "name": "15th Ave E",
                "address": "328 15th Ave E",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3125, 47.62146378]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "575",
                "name": "Division & Wellesley",
                "address": "4727 N. Division St, Northtown Square",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4116821, 47.7020874]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "576",
                "name": "The Lodge",
                "address": "545 BELLEVUE SQUARE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2019196, 47.61707687]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "577",
                "name": "1st & Pike-Seattle",
                "address": "102 Pike St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3399048, 47.60905075]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "578",
                "name": "Fairchild AFB",
                "address": "101 W Spaatz Rd",
                "city": "Fairchild AFB",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.6479034, 47.63875198]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "579",
                "name": "Bellevue Square",
                "address": "226 Bellevue Square",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2037201, 47.61585999]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "580",
                "name": "QFC - Seattle/Ballard #891",
                "address": "2237 NW 58th ST",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3872757, 47.67063904]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "581",
                "name": "QFC - Wallingford #869",
                "address": "1801 N 45th St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3361664, 47.6613884]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "582",
                "name": "Safeway - Federal Way #3501",
                "address": "2109 SW 336TH ST",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3609924, 47.30059052]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "583",
                "name": "Roy St Coffee & Tea",
                "address": "700 Broadway E",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3208694, 47.6252861]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "584",
                "name": "QFC - North Seattle #858",
                "address": "1531 NE 145th St",
                "city": "Seattlle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3106308, 47.73336411]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "585",
                "name": "Safeway-Everett #503",
                "address": "11031 19th Ave SE",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2054443, 47.89719009]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "586",
                "name": "Secure Access SCH River",
                "address": "4800 Sand Point Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2829437, 47.66294098]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "587",
                "name": "Secure Access SCH Ocean",
                "address": "4800 Sand Point Way, NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2809296, 47.66227341]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "588",
                "name": "Secure Access Bellevue Childrens",
                "address": "1500 116th Avenue",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1846771, 47.62419128]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "589",
                "name": "Safeway - Tacoma #3424",
                "address": "2411 N Proctor",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4886856, 47.26970291]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "590",
                "name": "Safeway - Spokane #1494",
                "address": "2507 W Wellesley Ave",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4476013, 47.70059967]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "591",
                "name": "Safeway-Seattle #219",
                "address": "3900 S Othello St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2830734, 47.53747177]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "592",
                "name": "College Way & Riverside Dr",
                "address": "329 East College Way",
                "city": "Mt Vernon",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3356552, 48.43629456]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "593",
                "name": "Safeway-Seattle #1586",
                "address": "12318 15th Ave NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3119812, 47.71800232]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "594",
                "name": "Good Samaritan Hospital Puyallup To",
                "address": "401 15th Ave SE",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2892456, 47.17754364]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "595",
                "name": "Safeway - Seattle #1993",
                "address": "2201 E Madison",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3035278, 47.61799622]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "596",
                "name": "Swedish Medical Center-Jefferson To",
                "address": "1600 E Jefferson St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3110275, 47.60648346]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "597",
                "name": "Safeway - Seattle #1550",
                "address": "7300 Roosevelt Way NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3168259, 47.68207169]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "598",
                "name": "164th & Alderwood Mall Parkway",
                "address": "2902 164th St. SW, Building G, Suite 1",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2730942, 47.84967804]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "599",
                "name": "Swedish Health Services-Issaquah Ca",
                "address": "751 NE Blakely Dr",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0217056, 47.53590393]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "600",
                "name": "Fred Meyer-Kirkland #391",
                "address": "12221 120th Ave NE",
                "city": "Kirkland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1838074, 47.7079277]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "601",
                "name": "Safeway-West Seattle #2932",
                "address": "2622 California Ave SW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.386322, 47.57956696]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "602",
                "name": "148th St. SW & Highway 99",
                "address": "3625 148th St SW, A101",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2832489, 47.86442184]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "603",
                "name": "Sunset Dr. & James St Road",
                "address": "1185 East Sunset Drive",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4608765, 48.77232742]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "604",
                "name": "4th & Union - Seattle",
                "address": "1318 4th Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3353195, 47.60916901]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "605",
                "name": "74th & Lakewood Drive - Lakewood",
                "address": "5422 74th Street West, A",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.509819, 47.18992615]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "606",
                "name": "Safeway - Vancouver #400",
                "address": "3707 Main St",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6679077, 45.64876175]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "607",
                "name": "Western Washington University",
                "address": "156 E College Way",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4858246, 48.73371887]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "608",
                "name": "Target Lynnwood T-338",
                "address": "18305 Alderwood Mall Pkwy",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2686005, 47.83262253]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "609",
                "name": "Overlake Medical Pavilion",
                "address": "1231 116th Ave. NE, 25",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1863327, 47.62101746]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "610",
                "name": "Safeway-Bothell #1864",
                "address": "24040 Bothell-Everett Hwy",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2128143, 47.78450012]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "611",
                "name": "QFC-Bellevue #827- Coal Creek",
                "address": "6940 Coal Creek Pkwy SE",
                "city": "Newcastle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1654434, 47.54027176]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "612",
                "name": "E. Marginal Way & Norfolk",
                "address": "10100 East Marginal Way South",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2933731, 47.5124855]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "613",
                "name": "Terry & Republican - Seattle",
                "address": "442 Terry Avenue N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3366776, 47.6227684]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "614",
                "name": "8th & Virginia - Seattle",
                "address": "2001 8th Ave, 100",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3369141, 47.61563873]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "615",
                "name": "Safeway-Seattle #423",
                "address": "7340 35th Ave NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2894058, 47.68253326]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "616",
                "name": "Kitsap Way & National",
                "address": "3933 Kitsap Way",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6673737, 47.56821823]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "617",
                "name": "3rd & Seneca",
                "address": "1201 3rd Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3358917, 47.60730362]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "618",
                "name": "5th & Columbia - Seattle",
                "address": "800 5th Ave, L901",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3304214, 47.60534286]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "619",
                "name": "Minor & Allen",
                "address": "100 N. Minor Rd., Suite A",
                "city": "Kelso",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8960342, 46.14567947]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "620",
                "name": "Evolution Fresh Pine Street",
                "address": "517 Pine Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.33564, 47.6118927]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "621",
                "name": "Target Seattle Downtown T-2786",
                "address": "1401 2nd Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3384399, 47.60837936]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "622",
                "name": "Albertsons 3411 @ Tacoma",
                "address": "8611 Steilacoom Blvd SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5519943, 47.18030548]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "623",
                "name": "164th & Bothell Hwy",
                "address": "16314 Bothell Everett Hwy",
                "city": "Mill Creek",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2191696, 47.84978485]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "624",
                "name": "College & Pacific - Lacey",
                "address": "1110 College Street SE",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8228607, 47.03769302]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "625",
                "name": "18th and Andresen- Vancouver,WA",
                "address": "2265 NE Andresen Rd., Suite 104",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6001129, 45.63886261]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "626",
                "name": "Evolution Fresh-University Village",
                "address": "2620 NE University Village St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2989731, 47.66395569]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "627",
                "name": "Fred Meyer-Seattle #122",
                "address": "100 NW 85th Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.358696, 47.69197845]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "628",
                "name": "City University",
                "address": "521 Wall St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3451004, 47.61750793]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "629",
                "name": "2nd & Cherry",
                "address": "621 2nd Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3333054, 47.60277939]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "630",
                "name": "Secure Access SCH Forest",
                "address": "4500 40th Ave NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2839203, 47.66220856]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "631",
                "name": "7th & Rainier Ave",
                "address": "641 Rainier Ave S",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2161255, 47.47412491]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "632",
                "name": "Clearwater & Columbia",
                "address": "7600 W Clearwater Ave",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2249832, 46.21007919]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "633",
                "name": "Bellis Fair Mall",
                "address": "1 Bellis Fair Parkway, 3215",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4892426, 48.78528214]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "634",
                "name": "83rd & Mill Plain Blvd - Vancouver",
                "address": "8302 E. Mill Plain Blvd",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.587204, 45.62380981]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "635",
                "name": "Northwest Hospital & Medical Ctr Lo",
                "address": "1550 North 115th St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3370514, 47.71405792]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "636",
                "name": "Kelsey Creek - Bellevue",
                "address": "180 148th Ave SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1399994, 47.6090126]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "637",
                "name": "Broadway & E Pike St",
                "address": "824 E Pike St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3209839, 47.61422348]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "638",
                "name": "Issaquah Highlands - Issaquah",
                "address": "903 NE Park Drive",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0199356, 47.54311752]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "639",
                "name": "224th & Meridian - Graham",
                "address": "22205 Meridian Ave E",
                "city": "Graham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2939377, 47.05437469]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "640",
                "name": "40th & Bridgeport",
                "address": "3904 Bridgeport Way W, Suite D",
                "city": "University Place",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5375214, 47.2217865]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "641",
                "name": "Safeway-Bellevue #3472",
                "address": "3903 Factoria Square Mall SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1711884, 47.57597733]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "642",
                "name": "Fred Meyer-East Wenatchee #654",
                "address": "11 Grant Rd.",
                "city": "East Wenatchee",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.2893295, 47.40603638]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "643",
                "name": "Sprague & Carnahan",
                "address": "5020 E Sprague Ave",
                "city": "Spokane Valley",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3368607, 47.65675354]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "644",
                "name": "Target Bellevue T-339",
                "address": "4053 Factoria Square Mall SE",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1728897, 47.5741806]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "645",
                "name": "Safeway - Issaquah 3006",
                "address": "1451  Highlands Dr NE",
                "city": "Issaquah",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0196838, 47.54146576]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "646",
                "name": "University Village South",
                "address": "2617 NE 46th St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2993622, 47.66166306]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "647",
                "name": "Leavenworth",
                "address": "932 Front St, Building A",
                "city": "Leavenworth",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.6594162, 47.59685516]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "648",
                "name": "Pacific Hwy & 288th",
                "address": "28722 Pacific Hwy S",
                "city": "Federal Way",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3118362, 47.34386063]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "649",
                "name": "23rd & Union - Tacoma",
                "address": "3401 S 23rd St",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.481926, 47.23913193]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "650",
                "name": "Riverstone Marketplace - Vancouver",
                "address": "3401 SE 192nd Ave, 100",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4776993, 45.59635925]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "651",
                "name": "196th & Hwy 99",
                "address": "6208 196th St SW, 101, Lynnwood Crossing",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3164978, 47.82092285]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "652",
                "name": "Safeway-North Bend #1528",
                "address": "460 SW Mt SI Blvd",
                "city": "North Bend",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.7940826, 47.4888649]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "653",
                "name": "Tulalip Outlet South",
                "address": "10600 Quil Ceda Blvd",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1878738, 48.09189224]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "654",
                "name": "15th Ave & NW 53rd - Ballard",
                "address": "5221 15th Ave NW",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3759079, 47.66693878]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "655",
                "name": "Fred Meyer-Bellingham #667",
                "address": "1225 W Bakerview Rd",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5100098, 48.78968811]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "656",
                "name": "Swedish First Hill Lobby",
                "address": "747 Broadway",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3216553, 47.60873795]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "657",
                "name": "102nd Ave SE & S 240th St- Kent",
                "address": "23930 102nd Ave SE",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2044601, 47.38725281]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "658",
                "name": "83rd & Aurora",
                "address": "8301 Aurora Ave. N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.344841, 47.68947983]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "659",
                "name": "Fred Meyer Seattle #28",
                "address": "14300 1st Ave S",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3338547, 47.47505951]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "660",
                "name": "Interstate 5 & Rush Road",
                "address": "1290 Rush Rd, B",
                "city": "Napavine",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9079361, 46.60483932]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "661",
                "name": "Safeway - Poulsbo 3148",
                "address": "19245 10th Ave NE",
                "city": "Poulsbo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6355896, 47.73733521]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "662",
                "name": "Safeway @ Seattle 1508",
                "address": "3820 Rainier Avenue South",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2883148, 47.56909561]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "663",
                "name": "Fremont Ave",
                "address": "3401 Fremont Avenue N, 3401",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3501358, 47.64983368]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "664",
                "name": "43rd St & E Valley",
                "address": "8825 S 180th St",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2221451, 47.44074631]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "665",
                "name": "26th & Nob Hill",
                "address": "2550 W Nob Hill Blvd, 108",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5434494, 46.58515167]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "666",
                "name": "Wheaton Way & Sylvan Way",
                "address": "3425 Wheaton Way",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6299744, 47.59619141]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "667",
                "name": "Target Spokane T-2857",
                "address": "4915 S Regal St",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3685532, 47.59902954]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "668",
                "name": "Safeway - Camas #1287",
                "address": "800 NE 3rd",
                "city": "Camas",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3998337, 45.58697128]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "669",
                "name": "Edmonds Way & 100th",
                "address": "9801 Edmonds Way",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3647003, 47.79070663]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "670",
                "name": "Bainbridge Island Village",
                "address": "337 High School Rd NE",
                "city": "Bainbridge Island",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5172501, 47.63553619]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "671",
                "name": "Broadway & 10th",
                "address": "1010 N Broadway",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2001877, 48.00405502]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "672",
                "name": "204th & Hwy 7 - Spanaway",
                "address": "20401 Mountain Hwy E",
                "city": "Spanaway",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4178772, 47.07134247]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "673",
                "name": "164th & Mill Plain",
                "address": "918 SE 164th Ave., 100",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5050735, 45.61412811]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "674",
                "name": "Secure Access Sodo 8",
                "address": "2401 Utah Ave S, 8th floor",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3358765, 47.58103943]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "675",
                "name": "Hwy 12 & Old Hwy 99 SW",
                "address": "19725 Old Hwy 99 SW",
                "city": "Rochester",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-123.0126266, 46.80124664]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "676",
                "name": "Teavana - Seattle",
                "address": "2652 NE University Village Street",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2991486, 47.66264725]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "677",
                "name": "Target Lacey T-1355",
                "address": "665 Sleater Kinney Rd",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8338547, 47.04198837]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "678",
                "name": "Target Puyallup T-342",
                "address": "3310 S Meridian",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2930756, 47.16142273]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "679",
                "name": "Teavana-Pacific Place 112",
                "address": "600 Pine St, #255",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3353653, 47.61234283]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "680",
                "name": "Target Spokane T-636",
                "address": "9770 N Newport Hwy",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4045868, 47.74674988]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "681",
                "name": "Target Lake Stevens T-1331",
                "address": "9601 Market Pl",
                "city": "Lake Stevens",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1012344, 47.99892807]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "682",
                "name": "Target Everett T-337",
                "address": "405 SE Everett Mall Wy",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2268906, 47.90863037]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "683",
                "name": "Pike Street Roastery",
                "address": "1124 Pike St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3281097, 47.61400986]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "684",
                "name": "Target Olympia T-607",
                "address": "2925 Harrison Ave NW",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9358292, 47.04646683]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "685",
                "name": "Safeway - Woodland #1762",
                "address": "1725 Pacific Ave",
                "city": "Woodland",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7483139, 45.91275787]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "686",
                "name": "Safeway - Bellingham #3285",
                "address": "1275 E Sunset Dr",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4585037, 48.77445221]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "687",
                "name": "Salmon Creek - 139th & 3rd",
                "address": "504 NE 139th Street, 104",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6666183, 45.72240829]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "688",
                "name": "Target Lakewood T-349",
                "address": "5618 Lakewood Town Ctr Blvd SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5101089, 47.16513824]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "689",
                "name": "Ambaum & SW 148th",
                "address": "901 SW 148th St",
                "city": "Burien",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3464127, 47.47019958]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "690",
                "name": "Albertsons Marysville #471",
                "address": "301 Marysville Mall #60",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1791306, 48.05082703]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "691",
                "name": "Safeway - Tacoma #1594",
                "address": "707 S 56th St",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4412689, 47.20653534]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "692",
                "name": "QFC - Renton #871",
                "address": "4800 NE 4th St",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1548233, 47.48949814]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "693",
                "name": "Teavana - Southcenter Mall",
                "address": "856  SOUTHCENTER MALL, Southcenter Mall",
                "city": "Tukwila",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2572556, 47.45937729]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "694",
                "name": "Teavana - Vancouver Mall WA",
                "address": "8700 N.E. Vancouver Mall, #126, Vancouver Mall WA",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.582756, 45.6582489]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "695",
                "name": "Teavana - Alderwood Mall",
                "address": "3000 184th St.N.W., #218, Alderwood Mall",
                "city": "LYNNWOOD",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2735062, 47.82966614]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "696",
                "name": "Teavana - Bellevue",
                "address": "234 BELLEVUE SQUARE, Bellevue",
                "city": "Bellevue",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2039719, 47.6153717]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "697",
                "name": "S. 1st Street & E. Nob Hill Blvd",
                "address": "1312 S 1st Street",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.497818, 46.58624649]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "698",
                "name": "Teavana - Tacoma Mall",
                "address": "4502 S. Steele St., #818, Tacoma Mall",
                "city": "Tacoma",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.469696, 47.2155304]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "699",
                "name": "Teavana - Bellis Fair",
                "address": "One Bellis Fair Parkway, #424, Bellis Fair",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.488266, 48.7595253]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "700",
                "name": "Village at Beardslee Crossing",
                "address": "19122 Beardslee Blvd, 208",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1913376, 47.7670517]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "701",
                "name": "Silverdale & Bucklin",
                "address": "3190 NW Bucklin Hill Road",
                "city": "Silverdale",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6925125, 47.65078735]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "702",
                "name": "Zulily Headquarters",
                "address": "2601 Elliott Ave, 101",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3525848, 47.61436081]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "703",
                "name": "Covington Esplanade",
                "address": "27177 185th Ave. S.E., 101",
                "city": "Covington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0986176, 47.35827255]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "704",
                "name": "The Junction - California & Alaska",
                "address": "4233 SW Alaska St.",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3865891, 47.5609436]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "705",
                "name": "Sodexo @ Gonzaga University Center",
                "address": "1027 N Hamilton St.",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3990555, 47.66702652]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "706",
                "name": "Dexter Station",
                "address": "1101 Dexter Ave",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3427963, 47.62902832]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "707",
                "name": "Fred Meyer Yakima #486",
                "address": "1206 N 40th",
                "city": "Yakima",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-120.5642853, 46.61973953]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "708",
                "name": "University of Washington HUB",
                "address": "4001 Stevens Wy NE",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3050308, 47.65529633]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "709",
                "name": "Hwy 104 - Kingston",
                "address": "8215 NE State HWY 104, 101",
                "city": "Kingston",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5397415, 47.80905914]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "710",
                "name": "N. Greene & E. Augusta",
                "address": "1605 N. Greene Street",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.3640823, 47.67293167]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "711",
                "name": "Fred Meyer-Renton #459",
                "address": "365 Renton Center Way SW",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.218483, 47.47744751]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "712",
                "name": "Target Kelso T-628",
                "address": "205 Three Rivers Dr",
                "city": "Kelso",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.9005127, 46.14228439]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "713",
                "name": "Target Gig Harbor T-1205",
                "address": "11400 51st Ave NW",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6080017, 47.36128616]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "714",
                "name": "Fred Meyer-Spokane #214",
                "address": "12120 N Division St",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.4024506, 47.76758575]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "715",
                "name": "Fred Meyer - Mill Creek #458",
                "address": "12906 Bothell-Everett Highway",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2092438, 47.87978745]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "716",
                "name": "Swedish Hospital Edmonds",
                "address": "21601 76th Ave W.",
                "city": "Edmonds",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3356628, 47.80328751]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "717",
                "name": "Haggen Stanwood #55",
                "address": "26603 72nd Ave NW",
                "city": "Stanwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3291931, 48.23790741]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "718",
                "name": "Fred Meyer-Lynnwood #180",
                "address": "4615 196th St SW",
                "city": "Lynnwood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2955017, 47.82175446]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "719",
                "name": "QFC-Enumclaw #863",
                "address": "1009 Monroe St",
                "city": "Enumclaw",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-121.9904709, 47.19962311]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "720",
                "name": "7th & Westlake - Seattle",
                "address": "2011 7th Ave, R2",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3381348, 47.61523819]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "721",
                "name": "Fred Meyer - Bothell #457",
                "address": "21045 Bothell-Everett Highway",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2073975, 47.80722809]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "722",
                "name": "GEG -  Conc C Upper (Gates 30-32)",
                "address": "9000 W. Airport Dr",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5373001, 47.62540436]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "723",
                "name": "Safeway - Gig Harbor #3321",
                "address": "4831 Point Fosdick Dr NW",
                "city": "Gig Harbor",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.575882, 47.30226517]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "724",
                "name": "NE 4th Street and Union Ave NE",
                "address": "4112 NE 4th Street",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1631393, 47.48887253]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "725",
                "name": "Target Seattle T-637",
                "address": "2800 SW Barton St",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3684006, 47.5210762]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "726",
                "name": "Safeway - Renton #3319",
                "address": "4300 NE 4th",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.161644, 47.48981857]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "727",
                "name": "Berkeley & Union - Tillicum",
                "address": "15305 Union Ave SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5563507, 47.11987305]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "728",
                "name": "Safeway - Everett #3298",
                "address": "7601 Evergreen Way",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2188568, 47.92900085]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "729",
                "name": "Hwy 3 & Finn Hill Rd",
                "address": "21215 Olhava Way 101",
                "city": "Poulsbo",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6610489, 47.75548172]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "730",
                "name": "Safeway - Shoreline  #3213",
                "address": "15332 Aurora Ave N",
                "city": "Shoreline",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3437271, 47.74035645]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "731",
                "name": "Safeway - Sammamish #555",
                "address": "630 228th Ave NE",
                "city": "Sammamish",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.0337753, 47.61564636]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "732",
                "name": "Safeway - Port Orchard #3317",
                "address": "3355 Bethel Rd SE",
                "city": "Port Orchard",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6298447, 47.518013]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "733",
                "name": "Martin Way & Kingham - Lacey",
                "address": "1020 Kingham St. NE",
                "city": "Lacey",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.7777405, 47.0542984]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "734",
                "name": "128th St SW & 4th Ave W - Everett",
                "address": "12811 4th Ave West",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2383728, 47.8814621]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "735",
                "name": "Fred Meyer - Salmon Creek #460",
                "address": "800 NE Tenney Road",
                "city": "Vancouver",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6654205, 45.72133255]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "736",
                "name": "Swedish Orthopedic Institute",
                "address": "601 Broadway",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3216324, 47.60815811]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "737",
                "name": "Fred Meyer - Covington #53",
                "address": "16735 SE 272nd Street",
                "city": "Covington",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1184082, 47.35647583]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "738",
                "name": "Safeway - Burien #3120",
                "address": "12725 1st Ave S",
                "city": "Burien",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3359375, 47.48922729]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "739",
                "name": "Fred Meyer-Kennewick #163",
                "address": "2811 W 10th Ave",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.1598969, 46.1980629]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "740",
                "name": "Iowa & King - Bellingham",
                "address": "814 Iowa St",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4639282, 48.75631332]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "741",
                "name": "Fred Meyer Everett #95",
                "address": "8530 Evergreen Way",
                "city": "Everett",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2316666, 47.92050934]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "742",
                "name": "Petro Travel Center - Spokane",
                "address": "10506 West Aero Road",
                "city": "Spokane",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-117.5613785, 47.58971405]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "743",
                "name": "Safeway - Tacoma #3305",
                "address": "15805 PACIFIC AVE S",
                "city": "TACOMA",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4320297, 47.11275101]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "744",
                "name": "FRED MEYER BREMERTON 171",
                "address": "5050 State Hwy 303 NE",
                "city": "Bremerton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.6287384, 47.60972214]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "745",
                "name": "Bothell Everett Hwy & 220th St SE",
                "address": "22020 17th Ave SE",
                "city": "Bothell",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2118683, 47.7972374]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "746",
                "name": "Bridgeport Way & 100th - Lakewood",
                "address": "10009 Bridgeport Way SW",
                "city": "Lakewood",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.5093079, 47.16643143]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "747",
                "name": "COLUMBIA CENTER MALL",
                "address": "1321 N. Columbia Center Blvd",
                "city": "Kennewick",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-119.2279739, 46.2259903]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "748",
                "name": "64th St NE & 47th Ave NE",
                "address": "4711 64th Street NE",
                "city": "Marysville",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1671906, 48.05214691]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "749",
                "name": "Martin Way & Sleater Kinney",
                "address": "4131 Martin Way E",
                "city": "Olympia",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.8323135, 47.0478096]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "750",
                "name": "Westlake and Mercer",
                "address": "515 Westlake Ave N",
                "city": "Seattle",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.3385773, 47.62448883]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "751",
                "name": "FRED MEYER - RENTON LS #31",
                "address": "17801 108TH Avenue SE",
                "city": "Renton",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.1988525, 47.44309616]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "752",
                "name": "Old Fairhaven Parkway & 30th",
                "address": "3101 Old Fairhaven Parkway",
                "city": "Bellingham",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.4778442, 48.71474075]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "753",
                "name": "FRED MEYER - KENT LS #172",
                "address": "10201 SE 240TH",
                "city": "Kent",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2054596, 47.38605499]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "754",
                "name": "152nd St & Meridian Ave",
                "address": "152nd St & Meridian Ave",
                "city": "Puyallup",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2924347, 47.11872864]
                }
            }, {
                "@search.action": "upload",
                "loc_id": "755",
                "name": "Albertsons - Milton #3113",
                "address": "2800 MILTON WAY",
                "city": "MILTON",
                "country": "US",
                "location": {
                    "type": "Point",
                    "coordinates": [-122.2951279, 47.25007629]
                }
            }
        ]
    }


module.exports = payloads;
