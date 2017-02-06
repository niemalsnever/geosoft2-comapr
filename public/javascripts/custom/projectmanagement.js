
function deleteProject(id, projectname) {
    if(confirm('Are you sure you want to delete the project "' + projectname + '"?')) {
        $.ajax({
            url: '/api/deleteProject',
            type: 'POST',
            data: {
                'projectid': id,
                'projectname': projectname
            },
            success: function (data) {
                $('#alert-space').empty();
                $('#alert-space').prepend(
                    '<div class="alert alert-success alert-dismissable fade in">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                    data +
                    '</div>'
                );
                getUserProjects();
            },
            error: function (data) {
                console.log(data);
                $('#alert-space').empty();
                $('#alert-space').prepend(
                    '<div class="alert alert-danger alert-dismissable fade in">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                    data.responseText +
                    '</div>'
                )
            }
        })
    }
}

function newProject(name)
{
    $.ajax({
        url: '/api/newProject',
        type: 'POST',
        data: {
            'projectname': name
        },
        success: function (data) {
            $('#alert-space').empty();
            $('#alert-space').prepend(
                '<div class="alert alert-success alert-dismissable fade in">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                data +
                '</div>'
            )
            getUserProjects();
        },
        error: function (data) {
            console.log(data);
            $('#alert-space').empty();
            $('#alert-space').prepend(
                '<div class="alert alert-danger alert-dismissable fade in">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                data.responseText +
                '</div>'
            )
        }
    })
}


function getUserProjects() {
    $.ajax({
        url: 'api/getUserProjects',
        type: 'GET',
        success: function (data) {
            console.log(data);
            projects = data;
            if(projects) {
                $('#project-list').empty();
                for(i=0; i<projects.length; i++) {
                    $('#project-list').append(
                        '<tr>' +
                        '<td>' +
                        '<a href="/map-view?projectID=' + projects[i].projecthash + '">' + projects[i].projectname + '</a>' +
                        '</td>' +
                        '<td>' +
                        '<span class="pull-right">' +
                        '<a href="#" data-original-title="invite user" data-toggle="tooltip" type="button" class="btn btn-info"><i class="glyphicon glyphicon-share"></i>Invite User</a> ' +
                        '<a data-original-title="Remove this project" data-toggle="tooltip" onclick="deleteProject(' + projects[i].projectid + ',\'' + projects[i].projectname + '\');" class="btn btn btn-danger"><i class="glyphicon glyphicon-remove"></i> Delete Project</a> ' +
                        '</span>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            }
        }
    })
}

function shareProject(projectHash) {
    $.ajax({
        url: 'api/shareProject',
        type: 'POST',
        data: {
            projectHash: projectHash,
            shareWithEmail: $('#shareEmailInput').val(),
            read: $('#allowRead').val(),
            write: $('#allowWrite').val(),
            share: $('#allowShare').val(),

        }
    })
}
