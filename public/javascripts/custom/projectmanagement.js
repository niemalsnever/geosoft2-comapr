
function deleteProject(id, projectname) {
    $.ajax({
        url: '/api/deleteProject',
        type: 'POST',
        data: {
            'projectid': id,
            'projectname' : projectname
        },
        success: function(){
            setTimeout(function(){window.location.href="/my-projects"},
                200);
        }
    })
}

function newProject(name)
{
    $.ajax({
        url: '/api/newProject',
        type: 'POST',
        data: {
            'projectname': name
        },
        success: function(){
            setTimeout(function(){window.location.href="/my-projects"},
                200);
        }
    })
}