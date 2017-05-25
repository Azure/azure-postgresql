$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#btndistance li").click(function () {
        $("#btndistance #disttitle").text($(this).text())
        $("#btndistance li").removeClass("Selected")
        $(this).addClass("Selected")
    })

    //create index in azure search service.
    azureSearch.createIndex()

    //clear function of coffee shops
    $("#btnclear").click(function () {
        gMap.clearCoffeeMarker();
    })
    //click event of search coffee shops
    $("#btnazuresearch").click(function () {
        if ($(".dropdown li.Selected").length > 0) {
            if ($("#btndistance li.Selected").length > 0) {
                gMap.displayLoader();
                for (var i = 0; i < gMap.locmarkers.length; i++) {
                    gMap.locmarkers[i].setMap(null);
                    //gMap.markers[i] = null;
                }
                for (var i = 0; i < gMap.locinfowindow.length; i++) {
                    gMap.locinfowindow[i].close();
                }
                gMap.locinfowindow = [];
                gMap.locmarkers = [];
                //gMap.map.center(new google.maps.LatLng(lat, long))
                gMap.map.setCenter(new google.maps.LatLng($(".dropdown li.Selected").attr("data-lat"), $(".dropdown li.Selected").attr("data-lng")));
                gMap.map.setZoom(14)
                azureSearch.getDataFromIndex($(".dropdown li.Selected").attr("data-lat"), $(".dropdown li.Selected").attr("data-lng"), $("#btndistance li.Selected").attr("data-value"))
            } else {
                swal('Error', 'Select Range for Azure Geospatial Search', 'error');
            }
        }
        else {
            swal('Error', 'Select Engagement for Azure Geospatial Search', 'error');
        }
    })
});
var azureSearch = {
    // Create index in azure search service.
    createIndex: function () {
        $.ajax({
            url: "/api/v1/create_index",
            type: "get",
            data: {},
            success: function (response) {

            },
            error: function (xhr) {

            }
        });
    },

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
                console.log(xhr)
            }
        });
    },


}
var postgres = {

    meetingData: null,//[{ loc_id: 1, loc_name: "Waltham, MA", subject: "First meeting", meeting_date: "2017-04-26", start_time: "01:00 PM", end_time: "03:00 PM", geometry: { type: "Point", coordinates: [21.1458004, 79.08815460000005] } }, { loc_id: 2, loc_name: "Manchester, NH", subject: "Second meeting", meeting_date: "2017-04-26", start_time: "02:00 PM", end_time: "04:00 PM", geometry: { type: "Point", coordinates: [19.0759837, 72.87765590000004] } }, { loc_id: 3, loc_name: "TI Blvd, TX", subject: "Third meeting", meeting_date: "2017-04-26", start_time: "03:00 PM", end_time: "05:00 PM", geometry: { type: "Point", coordinates: [28.6618976, 77.22739580000007] } }],

    //meetingJsonData: JSON.stringify(postgres.meetingData),

    getAndSetMeetingLocationsData: function (date) {
        //display please wait loader on date change/refresh page
        gMap.displayLoader()
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
                    $(".dropdown ul").html('<li><a>No Engagements</a></li>')
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
        $(".dropdown ul").html(str)

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
                }
                var m = Math.ceil((response.routes[0].overview_path.length) / 2)
                middle = response.routes[0].overview_path[m]

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

    // function to display loader 
    displayLoader: function () {

        $.blockUI({
            css: {
                border: 'none',
                padding: '10px 10px 15px 10px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
        $(".blockMsg h1").css({ 'font-size': '25px' })

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

