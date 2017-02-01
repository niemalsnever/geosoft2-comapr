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
    var file = $('#file-input-form')[0].files[0];
    console.log(file);
    var formdata = new FormData();

    formdata.append("file", file);

    console.log(formdata);

    $.ajax({
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
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