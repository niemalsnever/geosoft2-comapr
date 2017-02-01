//FIXME
function deleteProject(id)
{
    $.ajax({
        url: '/api/deleteProject',
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
        url: '/api/newProject',
        type: 'POST',
        data: {
            'projectname': name
        }
    })
}