$(document).ready(function () {
    //create table and push sample data
    
    login.initiateLaunch();
    login.initiateLoginControls();


})

var login = {

    initiateLaunch: function () {
        login.blockUI();

        $.ajax({
            url: "/api/v1/firstLaunch",
            type: "get",
            data: {},
            success: function (response) {
                $.unblockUI();
            },
            error: function (xhr) {
                $('#login-submit').prop("disabled", "disabled");
                $('#register-submit').prop("disabled", "disabled");
                $.unblockUI();
                swal('Error', 'Not able to initiate connection with Postgres DB and Azure Search service', 'error');
            }
        });
    },

    initiateLoginControls: function () {

        $("#error_msg").hide()
        if ($("#error_msg").text().trim().length > 0) {
            swal("Oops", $("#error_msg").text())
            $("#error_msg").text("")
        }
        $("#success_msg").hide()
        if ($("#success_msg").text().trim().length > 0) {
            swal("success", $("#success_msg").text(), "success")
            $("#success_msg").text("")
        }
        $('#login-form-link').click(function (e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function (e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $("#register-submit").click(function () {
            var password = $("#txt_password").val().trim();
            var confirmPassword = $("#txt_confirmpassword").val().trim();
            if (password != confirmPassword) {
                swal("Error", "Password and confirm password does not match", "error");
                return false;
            }
            return true;
        });
    },

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
