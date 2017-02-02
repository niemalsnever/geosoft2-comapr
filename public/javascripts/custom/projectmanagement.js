function deleteProject(id, projectname)
{
    $.ajax({
        url: '/deleteProject',
        type: 'POST',
        data: {
            'projectid': id,
            'projectname' : projectname
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