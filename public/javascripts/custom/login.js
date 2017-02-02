/**
 * Created by Sven O. Pagel on 1/31/17.
 */

$(document).ready(function () {
    // bei einem Klick
    $('#loginButton').on("click", function () {
        login();
    });
    // oder mit der Enter-Taste
    $('#loginEmail').on('keypress', function (e) {
        if (e.which == 13) {
            login();
        }
    });
    $('#loginPassword').on('keypress', function (e) {
        if (e.which == 13) {
            login();
        }
    });
});

function login() {
    $.ajax({
        url: '/login',
        type: 'POST',
        data: {
            'email': $('#loginEmail').val(),
            'password': $('#loginPassword').val(),
            'rto': $('#rto-hidden')[0].value
        },
        success: function (data) {
            console.log(data);
            window.location.reload(data);
        }
    })
}