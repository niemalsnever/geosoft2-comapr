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
    var uploadForm = $(':file')[0];
    var formdata = new FormData();

    for (var i = 0; i<uploadForm.files.length; i++) {
        formdata.append('file' + i, uploadForm.files[i]);
    }

    $.ajax({
        type: "POST",
        data: uploadForm.files[0],
        processData: false,
        contentType: 'multipart/form-data',
        url: '/api/fileUpload',
        timeout: 10000,
        success: function(data, textStatus){
            console.log("successfully saved");
        },
        error: function(xhr, textStatus, errorThrown){
            console.log("saving failed");
        }
    })
}