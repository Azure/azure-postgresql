
var azureSearch = {
    

    //Get geo-spatial data from index based on latitude, longitude and radius in km.
    getDataFromIndex: function (latitude, longitude, radius) {
        $.ajax({
            url: "/api/v1/get_data_from_index",
            type: "get",
            data: {
                latitude: latitude,
                longitude: longitude,
                radius: radius,
            },
            success: function (response) {

                console.log(response.length)
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {

                        var meetingContentHTML = '<div>' +
                            '<div class="infowindow"><p><b>' + response[i].name + '</b></p></div>' +
                            '<p><span style="font-weight:bold;color:fff">Location</span>: ' + response[i].address + '</p>' +
                            '</div>';
                        gMap.display_coffee_shop_marker(new google.maps.LatLng(response[i].location.coordinates[1], response[i].location.coordinates[0]), meetingContentHTML, response[i].name, "")
                    }
                    $.unblockUI()
                } else {
                    $.unblockUI()
                    swal('Oops', 'No near by Coffee shops available !!');

                }

            },
            error: function (xhr) {
                $.unblockUI()
                swal('Error', 'Error in getting coffee shops data from Azure Search Service', 'error');
            }
        });
    },


}
var postgres = {
    meetingData: null,
    getEngagementsData: function (date) {
        //display please wait loader on date change/refresh page
        main.blockUI();
        $.ajax({
            url: "/api/v1/GetMeetingData",
            type: "get",
            data: {
                meeting_date: date,
            },
            success: function (response) {

                postgres.meetingData = response;
                gMap.resetMap();
                // remove please wait loader
                $.unblockUI()
                if (response)
                    gMap.renderRouteData(response);
                else {
                    swal('No engagements', 'No engagements on ' + $('.date-picker').data('date'), 'info');
                    $("#engagementdata").html('<li><a>No Engagements</a></li>')
                }
            },
            error: function (xhr) {
                //Do Something to handle error
                // remove please wait loader
                $.unblockUI()
                swal('Error', 'Error in getting meeting data.', 'error');
            }
        });
    },

    saveEngagement: function (title, meeting_date, start_time, end_time, loc, latitude, longitude) {
        //function call to display loader.
        main.blockUI();
        // ajaxpost to save new engagement
        $.ajax({
            url: '/insert_data',
            type: 'PUT',
            data: {
                title: title,
                meeting_date: meeting_date,
                start_time: start_time,
                end_time: end_time,
                loc_name: loc,
                lat: latitude,
                long: longitude
            },
            success: function (data) {
                //stop loader
                $.unblockUI()
                swal('Success', 'Engagement saved successfully.', 'success');

                // reset map after saving new engagement
                var dateArray = $('.date-picker').data('date').split("/");
                var selectedMeetingdate = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];

                var newEngagementDate = meeting_date.split('-')[0] + "-" + meeting_date.split('-')[1] + "-" + meeting_date.split('-')[2];

                if (selectedMeetingdate == newEngagementDate) {
                    postgres.getEngagementsData(selectedMeetingdate);
                }
            },
            error: function (err) {
                //stop loader
                $.unblockUI()
                swal('Error', 'Error while saving Engagement.', 'error');
            }
        });
    }


}

var gMap = {

    map: null,
    directionsRendererService: "",
    directionsService: "",
    distanceMatrixService: "",
    //waypts: [],
    latlongArrayGlobal: [],
    markers: [],
    locmarkers: [],
    infoWindows: [],
    locinfowindow: [],

    //loads the map and binds it to the provided element and initiates direction components
    loadMap: function (mapContainer) {

        gMap.map = new google.maps.Map(mapContainer, {
            zoom: 16,
            center: { lat: 47.374366, lng: -122.2995801 }
        });

        gMap.directionsService = new google.maps.DirectionsService;
        gMap.directionsRendererService = new google.maps.DirectionsRenderer({ suppressMarkers: true });

        //gMap.directionsRendererService.setMap(gMap.map);

    },

    //Clear all the coffee shops marker and it's infowindow.
    clearCoffeeMarker: function () {

        $(".dropdown li").removeClass("Selected")
        for (var i = 0; i < gMap.locmarkers.length; i++) {
            gMap.locmarkers[i].setMap(null);
            //gMap.markers[i] = null;
        }
        for (var i = 0; i < gMap.locinfowindow.length; i++) {
            gMap.locinfowindow[i].close();
        }
        gMap.locinfowindow = [];
        gMap.locmarkers = [];
        gMap.map.setZoom(10)
        $("#title").text("Select Engagement")
        $("#btndistance li").removeClass("Selected")
        $("#disttitle").text("Select Range")
        //$("#btndistance #disttitle").text("5 mi")
        //$("#btndistance li:eq(1)").addClass("Selected")

    },

    //function to clear map .
    resetMap: function () {
        gMap.directionsRendererService.setMap(null);
        // gMap.directionsRendererService = null;
        gMap.directionsRendererService = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        // gMap.directionsRendererService.setMap(gMap.map);

        for (var i = 0; i < gMap.markers.length; i++) {
            gMap.markers[i].setMap(null);
            //gMap.markers[i] = null;
        }


        for (var i = 0; i < gMap.infoWindows.length; i++) {
            gMap.infoWindows[i].close();
        }

        gMap.markers = [];
        gMap.infoWindows = [];

        gMap.clearCoffeeMarker();
    },

    //function to display engagements data on google map.
    renderRouteData: function (meetingData) {

        //gMap.resetMap();       
        gMap.directionsRendererService.setMap(gMap.map);


        var latlongarray = [];

        var meetingContentArray = [];
        var locationTitles = [];
        var str = ""
        //segregating meeting data for lat-long and meeting content
        for (var i = 0; i < meetingData.length; i++) {
            var lat = meetingData[i].geometry.coordinates["1"];
            var long = meetingData[i].geometry.coordinates["0"];

            latlongarray.push(new google.maps.LatLng(lat, long));

            var meetingContentHTML = '<div>' +
                '<div class="infowindow"><p><b>' + meetingData[i].title + '</b></p></div>' +
                '<p><span style="font-weight:bold;color:fff">Start</span>: ' + meetingData[i].start + '</p>' +
                '<p><span style="font-weight:bold;color:fff">End</span>: ' + meetingData[i].end + '</p>' +
                '<br/>' +
                '<p><span style="font-weight:bold;color:fff">Location</span>: ' + meetingData[i].loc_name + '</p>' +
                '</div>';

            meetingContentArray.push(meetingContentHTML);

            locationTitles.push(meetingData[i].loc_name);

            str += "<li data-lat=" + meetingData[i].geometry.coordinates["1"] + " title=" + meetingData[i].title + " data-lng=" + meetingData[i].geometry.coordinates["0"] + "><a href='#'>";
            if (meetingData[i].title.length > 37) {
                str += meetingData[i].title.substring(0, 37) + "...</a></li>";
            } else {
                str += meetingData[i].title + "</a></li>";

            }
        }
        $("#engagementdata").html(str)

        $(".dropdown li").click(function () {

            $(".dropdown li").removeClass("Selected")
            $(this).addClass("Selected")
            $(".dropdown #title").text($(this).text())

            for (var i = 0; i < gMap.locmarkers.length; i++) {
                gMap.locmarkers[i].setMap(null);
                //gMap.markers[i] = null;
            }

            gMap.locmarkers = [];
            //alert("")

        });

        gMap.latlongArrayGlobal = latlongarray;

        gMap.waypts = []
        if (latlongarray.length > 2) {

            var waypts = []
            for (i = 1; i < latlongarray.length - 1; i++) {
                waypts.push({ location: latlongarray[i], stopover: true })

            }

            gMap.directionsService.route({
                origin: latlongarray[0],
                destination: latlongarray[latlongarray.length - 1],
                waypoints: waypts,
                optimizeWaypoints: false,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    console.log(response)
                    gMap.directionsRendererService.setDirections(response);
                }
                //  console.log(response, status)
            });

        }
        console.log(latlongarray.length)
        if (latlongarray.length == 1) {
            gMap.display_marker(latlongarray[0], meetingContentArray[0], locationTitles[0], 1)
            gMap.map.setCenter(latlongarray[0], 6)
        }
        else {
            for (var i = 0; i < latlongarray.length - 1; i++) {

                gMap.apply_direction_service(latlongarray[i], latlongarray[i + 1]);

                gMap.display_marker(latlongarray[i], meetingContentArray[i], locationTitles[i], (i + 1))

                if (i == latlongarray.length - 2) {
                    gMap.display_marker(latlongarray[i + 1], meetingContentArray[i + 1], locationTitles[i + 1], (i + 2))
                }
            }
        }
    },

    //uses direction service to get middle location of route between provided source and dest - middle location is used to show distnace and hours between source and dest
    apply_direction_service: function (sourcelatlong, destlatlong) {
        var middle = "";
        gMap.directionsService.route({
            origin: sourcelatlong,
            destination: destlatlong,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function (response, status) {
            if (status === 'OK') {
                if (gMap.latlongArrayGlobal.length < 3) {
                    gMap.directionsRendererService.setDirections(response);

                    if (gMap.latlongArrayGlobal.length == 2 && sourcelatlong.lat() == destlatlong.lat() && sourcelatlong.lng() == destlatlong.lng()) {
                        setTimeout(function () {
                            //  gMap.directionsRendererService.setMap(gMap.map);
                            gMap.map.setZoom(10)
                        }, 100);
                    }
                }
                var m = Math.ceil((response.routes[0].overview_path.length) / 2)
                middle = response.routes[0].overview_path[m]

                if (sourcelatlong.lat() != destlatlong.lat() && sourcelatlong.lng() != destlatlong.lng())
                    gMap.apply_direction_matrix(middle, sourcelatlong, destlatlong)
                //callback(middle, sourcelatlong, destlatlong);
            }
            else {

                swal('Error', 'Direction request failed due to ' + status, 'error');
            }
        });
    },



    //use distance matrix service to get distance and travel time between source and destination.
    apply_direction_matrix: function (middle, sourcelatlong, destlatlong) {

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [sourcelatlong],
            destinations: [destlatlong],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function (response, status) {
            console.log(response)
            if (status === 'OK') {
                var originlist = response.originAddresses;
                var destinationllist = response.destinationAddresses;
                for (var i = 0; i < originlist.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        var element = results[j]
                        var dt = element.distance.text;
                        var dr = element.duration.text;
                    }
                }

                //callback(middle, dt, dr);
                gMap.displayinfowindow(middle, dt, dr)

            } else {
                swal('Error', 'Distance matrix request failed due to ' + status, 'error');
            }
        });

    },

    //function to display engagements marker on google map.
    display_marker: function (latlong, displayContentHTML, markerTitle, index) {

        //var contentString = '<div id="content">' +
        //    '<div id="siteNotice"><h2>Meeting Content</h2>' +
        //    '</div>' +

        //    '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: displayContentHTML
        });

        var marker = new google.maps.Marker({
            position: latlong,
            map: gMap.map,
            title: markerTitle,
            label: "" + index + ""
        });
        gMap.markers.push(marker);

        marker.addListener('click', function () {
            infowindow.open(gMap.map, marker);
        });
    },

    //display coffee shops marker on google map.
    display_coffee_shop_marker: function (latlong, displayContentHTML, markerTitle, index) {

        var infowindow = new google.maps.InfoWindow({
            content: displayContentHTML
        });
        gMap.locinfowindow.push(infowindow);

        var marker = new google.maps.Marker({
            position: latlong,
            map: gMap.map,
            title: markerTitle,
            icon: {
                url: 'images/Coffee_2.png',
                scaledSize: new google.maps.Size(50, 50)
            },
        });

        gMap.locmarkers.push(marker);


        marker.addListener('click', function () {
            infowindow.open(gMap.map, marker);
        });
    },



    //displays infowindow

    displayinfowindow: function (latlong, dt, dr) {
        var content = '<div><i class="fa fa-car" aria-hidden="true" style="margin-right:3px;"></i>' + dt +
            '<br>' + dr +
            '</div>';
        var infowindow1 = new google.maps.InfoWindow({
            content: content
        });
        //infowindow1.setContent(content)
        infowindow1.setPosition(latlong)
        infowindow1.open(gMap.map)

        gMap.infoWindows.push(infowindow1);

    },

    //function for google map location autocomplete
    geolocate: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());

            });
        }

    }
}

