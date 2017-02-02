function validateRegForm() {
    if($("form#regForm")[0].checkValidity()) {
        console.log("foo");
        $("button#regSubmit")[0].disabled = false;
    }
}

function registerUser() {
    $.ajax({
        url: '/api/registerUser',
        type: 'POST',
        data: {
            'regName': $('#regNameInput').val(),
            'regEmail': $('#regEmailInput').val(),
            'regCity': $('#regCityInput').val(),
            'regCountry': $('#regCountryInput').val(),
            'regPassword': $('#regPasswordInput').val()
        },
        success: function () {
            $('h1').append('User has been registered');
        }
    })
}