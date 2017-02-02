
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
    console.log('adsf');
    $.ajax({
        
        url: '/newProject',
        type: 'POST',
        data: {
            'projectname': name
        }
    })
}