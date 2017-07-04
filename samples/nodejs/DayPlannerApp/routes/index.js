var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local')

//require to call search service function
var searchService = require('../searchService');

//require to call postgres function
var pgHelper = require('../pgHelper');

var async = require("async");

// Array to hold async tasks
var asyncTasks = [];



router.get('/dayplanner', ensureAuthenticated, function (req, res, next) {
    //if (req._passport.session.user.username != undefined)
    var fullname = req._passport.session.user.firstname + ' ' + req._passport.session.user.lastname;
    res.render('dayplanner', { username: fullname });
});

router.get('/api/v1/firstLaunch', (req, res, next) => {

    asyncTasks.push(function (callback) {
        pgHelper.createTableAndSampleData(callback);
    });

    asyncTasks.push(function (callback) {
        searchService.createIndex(callback);
    });

    // Execute all async tasks in the asyncTasks array
    async.parallel(asyncTasks, function (err) {
        // All tasks are done now
        asyncTasks = [];
        if (err)
            res.status(500).json({ success: false, data: err.message });
        else
            res.json([]);
    });

});

//function to change user password
router.get('/api/v1/changepassword', (req, res, next) => {
    pgHelper.changePassword(req, res);

});

// signin page
router.get('/profile', ensureAuthenticated, function (req, res, next) {
    res.render('profile', { username: req._passport.session.user.username, firstname: req._passport.session.user.firstname, lastname: req._passport.session.user.lastname });
});
// login page

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/dayplanner')
    } else {
        if (req.session.error != undefined) {
            res.render('login', { error: req.session.error });
            req.session.error = null;
        }
        else if (req.session.success != undefined) {
            res.render('login', { success: req.session.success });
            req.session.success = null;
        }
        else {
            res.render('login', { success: "" })
        }
    }

});



//Get Geo-Spatial data from Azure Search
router.get('/api/v1/get_data_from_index', (req, res, next) => {
    var results = [];
    searchService.getDataFromIndex(req.query.latitude, req.query.longitude, req.query.radius, res);

});

//Insert data into postgres database.
router.put('/insert_data', (req, res, next) => {

    pgHelper.insertData(req.body.loc_name, req.body.title, req.body.meeting_date, req.body.start_time, req.body.end_time, req.body.long, req.body.lat, req._passport.session.user.uid, res);

});

// create table at first launch
router.get('/api/v1/createTableAndSampleDataFirstLaunch', (req, res, next) => {
    pgHelper.createTableAndSampleDataFirstLaunch(res);

});

//Get meeting data based on meeting date.
router.get('/api/v1/GetMeetingData', (req, res, next) => {
    const meeting_date = req.query.meeting_date;
    const uid = req._passport.session.user.uid;
    //verifying request data for sql injection
    if (meeting_date.indexOf("--") > -1 || meeting_date.indexOf("'") > -1 || meeting_date.indexOf(";") > -1 || meeting_date.indexOf("/*") > -1 || meeting_date.indexOf("xp_") > -1) {
        console.log("Bad request detected");
        return res.status(500).json({ success: false, data: "Bad request detected" });
    } else {
        pgHelper.getMeetingData(meeting_date, uid, res);
    }

});


//=======================================passport=================
// Passport session setup.
passport.serializeUser(function (user, done) {
    console.log("serializing " + user.username);
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log("deserializing " + obj);
    done(null, obj)
    console.log("deserialize done")
});

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

// Use the LocalStrategy within Passport to login users.
passport.use('local-signin', new LocalStrategy(
    { passReqToCallback: true }, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        pgHelper.localAuth(username, password)
            .then(function (user) {
                if (user) {
                    console.log("LOGGED IN AS: " + user.username);
                    //req.session.success = 'You are successfully logged in ' + user.username + '!';
                    req.session.success = '';
                    done(null, user);
                }
                if (!user) {
                    console.log("COULD NOT LOG IN");
                    req.session.error = 'Username or Password does not match.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err) {
                console.log(err.body);
            });
    }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true }, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        pgHelper.localReg(req.body.firstname, req.body.lastname, username, password)
            .then(function (user) {
                if (user) {
                    console.log("REGISTERED: " + user.username);
                    req.session.success = 'Registration successful, Please login!';
                    done(null, false);
                }
                if (!user) {
                    console.log("COULD NOT REGISTER");
                    req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err) {
                console.log(err.body);
            });
    }
));



//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dayplanner',
    failureRedirect: '/',
    failureFlash: true
}));
//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true

}));

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
    //  req.session.success = "log-out successful";
});

module.exports = router;
