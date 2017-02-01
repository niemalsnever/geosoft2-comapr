//Function to save R-File from Textarea locally
function saveTextAsFile() {
    var textToSave = editor.getValue();
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/R"
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs =  $('#editorname')[0].value || 'currentEditorContent';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs + '.r';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

//Save from Textarea to R-File on Server
function saveTextAsR() {
        console.log('Hier bin ich!');
        var content = editor.getValue();
        var filename = $('#editorname')[0].value || $('#editorname').placeholder;
        console.log("This is content: " + content);
        $.ajax({
            url: '/api/saveCode',
            type: 'POST',
            data: {
              'newname' : filename,
                'code': content
            },
            processData: 'false'
        });
        event.preventDefault();
        return false;
}
