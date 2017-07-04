/* PostgreSQL and PostGIS module and connection setup */
var pg = require("pg"); // require Postgres module
var config = require('./config'); // requrired to access database string
var bcrypt = require('bcryptjs');
var Q = require('q');
var schedule = require('node-schedule');
// Setup connection
// connection string  to connect with postgres- retreiving using environment var
var conString = config.Postgres.connstr;
var pgAdminUser = config.Postgres.pgAdminUser;
var pingDBJobScheduled = false;


function getMeetingData(meeting_date, uid, res) {

    const results = [];
    const table_result = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, (err, client, done) => {
        // Handle connection errors
        console.log(err);
        if (err) {
            done();
            //console.log(err);
            return res.status(500).json({ success: false, data: err });

        }

        const meetingDataQuery = client.query("SELECT array_to_json(array_agg(row_to_json(t))) as meeting_data FROM (SELECT loc_id, loc_name, title, date, to_char(start_time::time, 'HH12:MI AM') as start, to_char(end_time::time, 'HH12:MI AM') as end, ST_AsGeoJSON(location)::json As geometry FROM engagements As engmt JOIN (SELECT uid, username FROM userinfo) As usrinfo ON engmt.uid = usrinfo.uid where engmt.date=$1 and engmt.uid=$2) As t;", [meeting_date, uid]);

        meetingDataQuery.on('row', (row) => {
            results.push(row);
        });

        meetingDataQuery.on('end', (row) => {
            done();
            return res.json(results[0].meeting_data);

        });


    });

}

exports.getMeetingData = getMeetingData;


function createTableAndSampleData(callback) {

    pg.connect(conString, (err, client, done) => {
        // Handle connection errors
        console.log(err);
        if (err) {
            done();
            return callback(err);
            //console.log(err);
            //return res.status(500).json({ success: false, data: err.message });

        }

        // ping db Recursively every 15 sec to avoid EConnReset  error on Azure when connection is idle
        if (!pingDBJobScheduled)
            pingDBRecursively();

        const results = []
        var hash = bcrypt.hashSync('test@123', 8);
        const query = "CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;\
	                    CREATE TABLE userinfo (\
	                    uid integer NOT NULL,\
                        firstname character varying(255),\
                        lastname character varying(255),\
	                    username character varying(255),\
	                    password character varying(255)\
	                    );\
	                    ALTER TABLE userinfo OWNER TO "+ pgAdminUser + ";\
	                    CREATE SEQUENCE userinfo_uid_seq\
	                    START WITH 1\
	                    INCREMENT BY 1\
	                    NO MINVALUE\
	                    NO MAXVALUE\
	                    CACHE 1;\
	                    ALTER TABLE userinfo_uid_seq OWNER TO "+ pgAdminUser + ";\
	                    ALTER SEQUENCE userinfo_uid_seq OWNED BY userinfo.uid;\
	                    ALTER TABLE ONLY userinfo ALTER COLUMN uid SET DEFAULT nextval('userinfo_uid_seq'::regclass);\
	                    ALTER TABLE ONLY userinfo ADD CONSTRAINT userinfo_pkey PRIMARY KEY (uid);\
	                    ALTER TABLE ONLY userinfo ADD CONSTRAINT username UNIQUE (username);\
	                    INSERT INTO userinfo (firstname, lastname, username, password) VALUES ('test', 'user', 'test', '"+ hash + "');\
	                    CREATE TABLE engagements (\
	                    loc_id integer NOT NULL,\
	                    loc_name character varying(255),\
	                    title character varying(255),\
	                    date date,\
	                    start_time time without time zone,\
	                    end_time time without time zone,\
	                    uid integer,\
	                    location geography(Point, 4326)\
	                    );\
	                    ALTER TABLE engagements OWNER TO "+ pgAdminUser + ";\
	                    CREATE SEQUENCE engagements_loc_id_seq\
	                    START WITH 1\
	                    INCREMENT BY 1\
	                    NO MINVALUE\
	                    NO MAXVALUE\
	                    CACHE 1;\
	                    ALTER TABLE engagements_loc_id_seq OWNER TO "+ pgAdminUser + ";\
	                    ALTER SEQUENCE engagements_loc_id_seq OWNED BY engagements.loc_id;\
	                    ALTER TABLE ONLY engagements ALTER COLUMN loc_id SET DEFAULT nextval('engagements_loc_id_seq'::regclass);\
	                    INSERT INTO engagements(loc_name, title, date, start_time, end_time, location, uid) VALUES\
                        ('Redmond, WA, USA', 'First Engagement', CURRENT_DATE, '10:00 AM', '11:00 AM', ST_GeographyFromText('point(-122.095741 47.676295)'), (select uid from userinfo where username='test')),\
                        ('Seattle, WA, USA', 'Second Engagement', CURRENT_DATE, '1:00 PM', '2:00 PM', ST_GeographyFromText('point(-122.329064 47.592306)'), (select uid from userinfo where username='test')),\
	                    ('Bellevue, WA, USA', 'Third Engagement', CURRENT_DATE, '3:00 PM', '4:00 PM', ST_GeographyFromText('point(-122.201489 47.610139)'),(select uid from userinfo where username='test')),\
	                    ('Renton, WA, USA', 'Fourth Engagement', CURRENT_DATE, '5:30 PM', '6:00 PM', ST_GeographyFromText('point(-122.218031 47.471115)'),(select uid from userinfo where username='test')),\
	                    ('Tacoma, WA, USA', 'Last Engagement', CURRENT_DATE, '7:00 PM', '8:00 PM', ST_GeographyFromText('point(-122.457853 47.233862)'),(select uid from userinfo where username='test'));\
	                    ALTER TABLE ONLY engagements ADD CONSTRAINT engagements_pkey PRIMARY KEY (loc_id);\
	                    ALTER TABLE ONLY engagements ADD CONSTRAINT uid FOREIGN KEY (uid) REFERENCES userinfo(uid);";

        const table_result = [];
        //query to check if table does not exist, so that a table with sample data can be created
        const tableExistsQuery = client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'engagements') as firstData;SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'userinfo') as secondData;");
        // Stream results back one row at a time
        tableExistsQuery.on('row', (row) => {
            table_result.push(row);
        });
        // After all data is returned, close connection and return results
        tableExistsQuery.on('end', () => {
            //verifying if table exists to retrieve data directly for meeting date
            if ((table_result[0].firstdata == true) && (table_result[1].seconddata == true))
            {
                done();
                callback();
                //return res.json([{ "status": true }]);
            }
            else
            {
                const createTableQuery = client.query(query);
                createTableQuery.on('row', (row) => {
                    results.push(row);
                });

                createTableQuery.on('end', (row) => {
                    done();
                    callback();
                    //return res.json([{ "status": true }]);

                });
            }

        });

    });

}
exports.createTableAndSampleData = createTableAndSampleData;

function insertData(loc_name, title, meeting_date, start_time, end_time, longitude, latitude, uid, res) {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(conString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        var str = "INSERT INTO engagements(loc_name, title, date, start_time, end_time, location, uid) VALUES ('" + loc_name + "', '" + title + "', '" + meeting_date + "', '" + start_time + "', '" + end_time + "', ST_GeographyFromText('point(" + longitude + " " + latitude + ")'), " + uid + ");";
        var query = client.query(str);
        // Stream results back one row at a time
        console.log(results);
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });

}
exports.insertData = insertData;
//used in local-signup strategy
exports.localReg = function (firstname, lastname, username, password) {
    var results = []
    var deferred = Q.defer();
    pg.connect(conString, (err, client, done) => {
        // Handle connection errors
        console.log(err);
        if (err) {
            done();
            //console.log(err);
            // return res.status(500).json({ success: false, data: err.message });
            deferred.resolve(false);
            return deferred.promise;

        }

        const selectedData = client.query("select count(uid) from userinfo where username='" + username + "';");

        selectedData.on('row', (row) => {
            //results.push(row);
            if (row.count == "1") {
                done();
                //console.log("User already exists")
                console.log("USERNAME ALREADY EXISTS:", username);
                deferred.resolve(false); // username exists
            }
            else {
                var hash = bcrypt.hashSync(password, 8);
                console.log("CREATING USER:", username);
                const insertQuery = client.query(" insert into userinfo (firstname, lastname, username, password) values('" + firstname + "', '" + lastname + "', '" + username + "','" + hash + "');");
                var user = {
                    "username": username,
                    "password": password
                }
                done();
                deferred.resolve(user);
            }
        });
        //check if username is already assigned in our database

    });
    return deferred.promise;
};


//check if user exists
//if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//if password matches take into website
//if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {

    var deferred = Q.defer();
    pg.connect(conString, (err, client, done) => {
        // Handle connection errors
        console.log(err);
        if (err) {
            done();
            //console.log(err);
            // return res.status(500).json({ success: false, data: err.message });
            deferred.resolve(false);
            return deferred.promise;

        }

        const selectedData = client.query("select count(uid)count from userinfo where username='" + username + "';");

        selectedData.on('row', (row) => {
            //results.push(row);
            if (row.count != "0") {
                const selectedData = client.query("select uid,firstname, lastname, username, password from userinfo where username= '" + username + "';");
                selectedData.on('row', (row) => {
                    done();
                    var hash = row.password;
                    console.log("FOUND USER: " + row.username);

                    if (bcrypt.compareSync(password, hash)) {
                        deferred.resolve(row);
                    } else {
                        console.log("AUTHENTICATION FAILED");
                        deferred.resolve(false);
                    }

                });

            } else {
                done();
                console.log("USERNAME NOT FOUND:", username);
                deferred.resolve(false);

            }


        });
    });
    return deferred.promise;
}

exports.changePassword = function (req, res) {
    var newpassword = bcrypt.hashSync(req.query.newpassword, 8);
    if (bcrypt.compareSync(req.query.currentpassword, req._passport.session.user.password)) {
        pg.connect(conString, (err, client, done) => {
            // Handle connection errors
            console.log(err);
            if (err) {
                done();
                //console.log(err);
                return res.status(500).json({ success: false, data: err });

            }
            const selectedData = client.query("update userinfo set password = '" + newpassword + "' where uid=" + req._passport.session.user.uid + ";");
            done();
            console.log("password changed successful")
            return res.json([{ "status": true }])

        });
        //return res.json([{ "status": true }])
    } else {
        console.log("Failed to change password")
        return res.json([{ "status": false }])
    }

}


// ping db Recursively every 15 sec to avoid EConnReset  error on Azure when connection is idle
function pingDBRecursively() {
    
    var j = schedule.scheduleJob('*/15 * * * * *', function () {
        pg.connect(conString, (err, client, done) => {
            // Handle connection errors
            done();
        });

    });    

    pingDBJobScheduled = true;
    console.log("Ping DB Job Scheduled");

    

}