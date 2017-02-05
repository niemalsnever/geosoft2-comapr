$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});
$(document).ready( function() {
    $(':file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });
});

$('#uploadButton').on('click', function () {
    uploadFile();
});

function uploadFile() {
    var form = document.getElementById('file-upload-form');
    var formData = new FormData();

    files = $('#file-input').get(0).files;

    formData.append('uploads[]', files[0], files[0].name);

    console.log(formData);

    $.ajax({
        type: "POST",
        data: formData,
        url: '/api/fileUpload?pn=' + projectName,
        processData: false,
        contentType: false,
        timeout: 10000,
        success: function(data, textStatus){
            console.log("successfully saved");
            dataTreeUpdate();
        },
        error: function(xhr, textStatus, errorThrown){
            console.log("saving failed");
        }
    })
}