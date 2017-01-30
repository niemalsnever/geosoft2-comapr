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