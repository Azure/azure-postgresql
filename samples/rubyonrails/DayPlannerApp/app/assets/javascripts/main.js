var mapContainer;
var meetingDate;
var loc = "";
var latitude = "";
var longitude = "";
var selected_start_time = "";
var selected_end_time = "";

$(document).ready(function () {

    $("#saveengagement").click(function () {
        save_engagement();
    });
    $("#newEventModel").click(function () {
        reset_engangement();
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
    gMap.loadMap(document.getElementById('map'));
    mapContainer = $('#map');
    //setting today as current date in date picker
    var date = new Date();
    var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    $("#date-input").val(today);
    $('.input-datepicker > .input-group-btn > button').click();
});

// Save new engagement to DB
function save_engagement() {
    var title = $("#title-name").val();
    var meeting_date = $("#meetingdate-name").val();
    var start_time = $("#starttime-name").val();
    var end_time = $("#endtime-name").val();
    if (title.trim() == "") {
        swal('Warning', 'Please enter title.', 'warning');
    }
	else if (loc.trim() != $("#location").val().trim() || latitude == "" || longitude == "") {
        swal('Warning', 'Please select valid location.', 'warning');
    }
    else if (loc.trim() == "" && latitude.trim() == "" && longitude.trim() == "") {
        swal('Warning', 'Please select location.', 'warning');
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
    else
        {
			$(".close").click();
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
        $.ajax({
            url: '/waypoint/waypoint.json',
            type: 'post',
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
                $.unblockUI()
                swal('Success', 'Engagement saved successfully.', 'success');
                // reset map after saving new engagement
				var dateArray = $('.date-picker').data('date').split("/");
                var selectedMeetingdate = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];
                var newEngagementDate = meeting_date.split('-')[0] + "-" + meeting_date.split('-')[1] + "-" + meeting_date.split('-')[2];
                if (selectedMeetingdate == newEngagementDate) {
                    postgres.getAndSetMeetingLocationsData(selectedMeetingdate);
                }
            },
            error: function (err) {
                $.unblockUI()
                swal('Error', 'Error while saving Engangement.', 'error');
            }
        });
    }
}

// Clear all control data
function reset_engangement() {
    $(".modal-body input").val("");
    $(".form_date").datetimepicker("setDate", new Date);
    loc = "";
    latitude = "";
    longitude = "";
    selected_start_time = "";
    selected_end_time = "";
}