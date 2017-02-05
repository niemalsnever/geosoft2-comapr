function validateRegForm() {
    if($("form#regForm")[0].checkValidity()) {
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
        success: function (data) {
            $('#alert-space').prepend(
                '<div class="alert alert-success alert-dismissable fade in">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                data.responseText +
                '</div>'
            )
        },
        error: function (data) {
            console.log(data);
            $('#alert-space').prepend(
                '<div class="alert alert-danger alert-dismissable fade in">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                data.responseText +
                '</div>'
            )
        }
    })
}