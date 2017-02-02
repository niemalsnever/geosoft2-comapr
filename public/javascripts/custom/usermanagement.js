function deleteUser(id)
{
    $.ajax({
        url: '/api/deleteUser',
        type: 'POST',
        data: {
            'userID': id
        },
        success: function(){
            setTimeout(function(){window.location.href="/sign-up"}, 200);
        }
    })

}

function editUser(){
    data = {
        'username': $('#editname').val(),
        'email':   $('#editemail').val(),
        'city': $('#editcity').val(),
        'country': $('#regCountryInput').val()
    };

    $.ajax({
        url: '/api/editUser',
        type: 'POST',
        data: data,
        success: function() {
            setTimeout(function(){window.location.href="/my-account"},
                200);
        }
    })
}
