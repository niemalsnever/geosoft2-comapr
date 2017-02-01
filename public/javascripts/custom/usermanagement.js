//FIXME
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

function editUser(id){
    $.ajax({
        url: 'editUser',
        type: 'POST',
        data: {
            'Username':name,
            'City' :   City,
            'Country': Country,
            'E-mail' : email
        }
    })
}
