function deleteProject(id)
{
    $.ajax({
        url: '/deleteProject',
        type: 'POST',
        data: {
            'projectid': id
        }
    })
}
function newProject(name)
{
    $.ajax({
        url: '/newProject',
        type: 'POST',
        data: {
            'projectname': name
        }
    })
}

function projectID()
{
    $.ajax({
        url:'/projectID',
        type:'POST',
        data:{
            'projectid': id
        }
        
    })
}