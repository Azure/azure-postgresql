var mapContainer;
var meetingDate;

var loc = "";
var latitude = "";
var longitude = "";

var selected_start_time = "";
var selected_end_time = "";

$(document).ready(function () {

    gMap.loadMap(document.getElementById('map'));
    mapContainer = $('#map');

    //setting today as current date in date picker
    var date = new Date();
    var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    $("#date-input").val(today);

    main.initiateAddEngagementControls();
    main.initiateSearchControls();

    $('.input-datepicker > .input-group-btn > button').click();

    $("#date-input").on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('.input-datepicker > .input-group-btn > button').click();
        }
    });
});


var main = {


    initiateAddEngagementControls: function () {
        $("#saveengagement").click(function () {
            main.saveEngagement();
        });

        $("#newEventModel").click(function () {
            main.resetEngagementControls();
        });

        $(".form_time[data-link-field='starttime-name']").change(function () {
            // set start time value in selected_start_time variable
            selected_start_time = "";
            if ($("#starttime-name").val().trim() != "") {
                var d = new Date();
                var day = d.getDay();
                var month = d.getMonth();
                var year = d.getFullYear();
                var hour = $("#starttime-name").val().split(':')[0];
                var min = $("#starttime-name").val().split(':')[1];
                selected_start_time = new Date(year, month, day, hour, min);
                if ($("#endtime-name").val().trim() != "") {
                    var d = new Date();
                    var day = d.getDay();
                    var month = d.getMonth();
                    var year = d.getFullYear();
                    var hour = $("#endtime-name").val().split(':')[0];
                    var min = $("#endtime-name").val().split(':')[1];
                    var selected_end_time = new Date(year, month, day, hour, min)
                    if (selected_end_time <= selected_start_time) {
                        swal('Warning', 'Start time should be less than End time', 'warning');
                        $(".form_time[data-link-field='starttime-name'] .glyphicon-remove").click()

                    }
                }
            }
        });

        $(".form_time[data-link-field='endtime-name']").change(function () {
            // set start time value in selected_end_time variable
            selected_end_time = "";
            if ($("#endtime-name").val().trim() != "") {
                var d = new Date();
                var day = d.getDay();
                var month = d.getMonth();
                var year = d.getFullYear();
                var hour = $("#endtime-name").val().split(':')[0];
                var min = $("#endtime-name").val().split(':')[1];
                var selected_end_time = new Date(year, month, day, hour, min)
            }

            // validate start time and end time
            if ($("#starttime-name").val().trim() != "" && $("#endtime-name").val().trim() != "") {
                if (selected_end_time <= selected_start_time) {
                    swal('Warning', 'End time should be greater than Start time', 'warning');
                    $(".form_time[data-link-field='endtime-name'] .glyphicon-remove").click()
                }
            }
        });

        // Create Location auto-complete
        google.maps.event.addDomListener(window, 'load', function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('location'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                loc = $("#location").val();
                latitude = place.geometry.location.lat();
                longitude = place.geometry.location.lng();
            });
        });

        // Create Datepicker control
        $('.form_date').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });

        // Create Timepicker control
        $('.form_time').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0
        });

        // set current date to meeting date datepicker
        $('.form_date').datetimepicker('setDate', new Date);

        $("#newEventModel").click(function (event) {
            event.stopPropagation();
            $("#myModal").modal('show');
            return false;
        });
    },

    initiateSearchControls: function () {

        $('[data-toggle="tooltip"]').tooltip();

        $("#btndistance li").click(function () {
            $("#btndistance #disttitle").text($(this).text())
            $("#btndistance li").removeClass("Selected")
            $(this).addClass("Selected")
        })

        //create index in azure search service.
        // azureSearch.createIndex()

        //clear function of coffee shops
        $("#btnclear").click(function () {
            gMap.clearCoffeeMarker();
        })
        //click event of search coffee shops
        $("#btnazuresearch").click(function () {
            if ($(".dropdown li.Selected").length > 0) {
                if ($("#btndistance li.Selected").length > 0) {
                    main.blockUI();
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
    },

    saveEngagement: function () {
        var title = $("#title-name").val();
        var meeting_date = $("#meetingdate-name").val();
        var start_time = $("#starttime-name").val();
        var end_time = $("#endtime-name").val();

        if (title.trim() == "") {
            swal('Warning', 'Please enter title.', 'warning');
        }
        else if ($("#location").val().trim() == "") {
            swal('Warning', 'Please select location.', 'warning');
        }
        else if (loc.trim() != $("#location").val().trim() || latitude == "" || longitude == "") {
            swal('Warning', 'Please select valid location.', 'warning');
        }
        else if (meeting_date.trim() == "") {
            swal('Warning', 'Please enter meeting date.', 'warning');
        }
        else if (start_time.trim() == "") {
            swal('Warning', 'Please enter start time.', 'warning');
        }
        else if (end_time.trim() == "") {
            swal('Warning', 'Please enter end time.', 'warning');
        }
        else {
            $(".close").click();

            postgres.saveEngagement(title, meeting_date, start_time, end_time, loc, latitude, longitude);
        }
    },

    resetEngagementControls: function () {
        $(".modal-body input").val("");
        //populating selected date in add engagement date control
        $('.form_date').datetimepicker('setDate', new Date($('.date-picker').data('date')));
        loc = "";
        latitude = "";
        longitude = "";
        selected_start_time = "";
        selected_end_time = "";
    },


    // function to display loader 
    blockUI: function () {

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

    }
}


function initMap() {

}



