//FIXME
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
function newProject(name, ownerid)
{
    console.log('adsf');
    $.ajax({
        
        url: '/newProject',
        type: 'POST',
        data: {
            'name': name,
            'ownerid': ownerid
        }
    })
}