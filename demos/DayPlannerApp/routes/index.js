var express = require('express');
var router = express.Router();

//require to call search service function
var searchService = require('../searchService');

//require to call postgres function
var pgHelper = require('../pgHelper');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('dayplanner');
});

//Create index in Azure Search and Insert Data
router.get('/api/v1/create_index', (req, res, next) => {
    searchService.createIndex()
    res.json([])
});

//Get Geo-Spatial data from Azure Search
router.get('/api/v1/get_data_from_index', (req, res, next) => {
    var results = [];
    searchService.getDataFromIndex(req.query.latitude, req.query.longitude, req.query.radius, res);

});

//Insert data into postgres database.
router.put('/insert_data', (req, res, next) => {

    pgHelper.insertData(req.body.loc_name, req.body.title, req.body.meeting_date, req.body.start_time, req.body.end_time, req.body.long, req.body.lat, res);

});

//Get meeting data based on meeting date.
router.get('/api/v1/GetMeetingData', (req, res, next) => {
    const meeting_date = req.query.meeting_date;
    //verifying request data for sql injection
    if (meeting_date.indexOf("--") > -1 || meeting_date.indexOf("'") > -1 || meeting_date.indexOf(";") > -1 || meeting_date.indexOf("/*") > -1 || meeting_date.indexOf("xp_") > -1) {
        console.log("Bad request detected");
        return res.status(500).json({ success: false, data: "Bad request detected" });
    } else {
        pgHelper.getMeetingData(meeting_date, res);
    }

});
module.exports = router;
