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

function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("editor").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}


//Save from Textarea to R-File
function saveTextAsR() {
        console.log('Hier bin ich!');
        var content = editor.getValue();
        var filename = $('#editorname')[0].value;
        console.log("This is content: " + content);
        $.ajax({
            url: '/getcode',
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
