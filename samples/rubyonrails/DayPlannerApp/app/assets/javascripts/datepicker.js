$(document).ready(function () {

    $(window).on('focus', function (event) {
        $('.show-focus-status > .alert-danger').addClass('hidden');
        $('.show-focus-status > .alert-success').removeClass('hidden');
    }).on('blur', function (event) {
        $('.show-focus-status > .alert-success').addClass('hidden');
        $('.show-focus-status > .alert-danger').removeClass('hidden');
    });

    $('.date-picker').each(function () {
        var $datepicker = $(this),
            cur_date = ($datepicker.data('date') ? moment($datepicker.data('date'), "MM/DD/YYYY") : moment()),
            format = {
                "weekday": ($datepicker.find('.weekday').data('format') ? $datepicker.find('.weekday').data('format') : "dddd"),
                "date": ($datepicker.find('.date').data('format') ? $datepicker.find('.date').data('format') : "MMMM Do"),
                "year": ($datepicker.find('.year').data('year') ? $datepicker.find('.weekday').data('format') : "YYYY")
            };

        function updateDisplay(cur_date) {
            $datepicker.find('.date-container > .weekday').text(cur_date.format(format.weekday));
            $datepicker.find('.date-container > .date').text(cur_date.format(format.date));
            $datepicker.find('.date-container > .year').text(cur_date.format(format.year));
            $datepicker.data('date', cur_date.format('MM/DD/YYYY'));
            $datepicker.find('.input-datepicker').removeClass('show-input');

            dateArray = $datepicker.data('date').split("/");
            formattedDate = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];
            // Date from main UI
            postgres.getAndSetMeetingLocationsData(formattedDate);
        }

        updateDisplay(cur_date);
        $datepicker.on('click', '[data-toggle="calendar"]', function (event) {
            event.preventDefault();
            $datepicker.find('.input-datepicker').toggleClass('show-input');
        });

        $datepicker.on('click', '.input-datepicker > .input-group-btn > button', function (event) {
            event.preventDefault();
            var $input = $(this).closest('.input-datepicker').find('input'),
                date_format = ($input.data('format') ? $input.data('format') : "MM/DD/YYYY");
            
			if($input.val() != ""){
			if (moment($input.val(), date_format).isValid()) {
                updateDisplay(moment($input.val(), date_format));
            } else {
                alert('Invalid Date');
            }
			 }
        });

        $datepicker.on('click', '[data-toggle="datepicker"]', function (event) {
            event.preventDefault();

            var cur_date = moment($(this).closest('.date-picker').data('date'), "MM/DD/YYYY"),
                date_type = ($datepicker.data('type') ? $datepicker.data('type') : "days"),
                type = ($(this).data('type') ? $(this).data('type') : "add"),
                amt = ($(this).data('amt') ? $(this).data('amt') : 1);

            if (type == "add") {
                cur_date = cur_date.add(date_type, amt);
            } else if (type == "subtract") {
                cur_date = cur_date.subtract(date_type, amt);
            }
            updateDisplay(cur_date);
        });
    });
});