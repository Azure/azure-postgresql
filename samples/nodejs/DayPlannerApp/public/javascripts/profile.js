$(document).ready(function () {

    $("#btnchangepwd").click(function () {

        var currentpassword = $("#currentpassword").val().trim();
        var newpassword = $("#newpassword").val().trim();
        var confirmpassword = $("#confirmpassword").val().trim();
        if (newpassword != confirmpassword) {
            $("#newpassword").val("");
            $("#confirmpassword").val("");
            swal("Passwords do not match.");
            return false;
        }
        else if (currentpassword != '' && newpassword != '')
        {
            if (newpassword.length >= 6) {
                profile.changepassword(currentpassword, newpassword)
            } else
            {
                swal('error', "New Password should contain Minimum of 6 characters", 'error');
            }
        }
        else if(currentpassword == '' || newpassword == '' || confirmpassword == '')
        {
            swal('error', "Please enter Current Password, New Password and Confirm Password..", 'error');
        }

    })

    $("#clsbutton").click(function () {
        $("#currentpassword").val("")
        $("#newpassword").val("")
        $("#confirmpassword").val("")

    })
})

var profile = {
    changepassword: function (currentpassword, newpassword) {     
        $.ajax({
            url: "/api/v1/changepassword",
            type: "get",
            data: { currentpassword: currentpassword, newpassword: newpassword },
            success: function (response) {               
                if (response[0].status)
                {
                    swal('Success', 'Password changed successfully, Please log-in again..', 'success');
                    $(".sweet-alert.showSweetAlert button:eq(1)").click(function () {
                        window.location.href = "/logout"
                    });
                }
                else
                {
                    $("#currentpassword").val("");
                    $("#newpassword").val("");
                    $("#confirmpassword").val("");
                    swal('Error', 'Please check Current password', 'error');
                }
            },
            error: function (xhr) {

            }
        });
    },
}