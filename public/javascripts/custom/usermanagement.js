
function deleteUser(id)
{
    $.ajax({
        url: '/deleteUser',
        type: 'POST',
        data: {
            'userID': id
        },
        success: function(){
            setTimeout(function(){window.location.href="/sign-up"}, 200);
        }
    })
   
}
//FUCKING FIXME
function editUser(name, city, country, email){
    $.ajax({
        url: '/editUser',
        type: 'POST',
        data: {
            'username':name,
            'email' :   email,
            'city': city,
            'country' : country
        },
        success: function(){
            setTimeout(function(){window.location.href="/my-account"},
                      200);
        }
    })
}
