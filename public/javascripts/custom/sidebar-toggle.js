/**
 * Created by Sven O. Pagel on 2017-01-31.
 */

var sbShown = true;
function toggleSidebar() {
    var mainContent = $('main');
    if(sbShown == true) {
        $('#sidebar').fadeToggle(800, function () {
            mainContent.removeClass('col-md-9');
            mainContent.removeClass('col-lg-10');
            mainContent.addClass('col-md-12');
            mainContent.addClass('col-lg-12');
            mymap.invalidateSize();
            sbShown = false;
        });
    } else {
        mainContent.removeClass('col-md-12');
        mainContent.removeClass('col-lg-12');
        mainContent.addClass('col-md-9');
        mainContent.addClass('col-lg-10');
        mymap.invalidateSize();
        $('#sidebar').fadeToggle(800);
        sbShown = true;
    }
}

var codeEditorDiv = $('#code-editor');

codeEditorDiv.on('hidden.bs.collapse', function () {
    if (!sbShown) {
        $('#mapcontainer').find('h2').fadeOut();
    }
    $('#mapid').animate({ 'height': "+=25rem" }, function () {
        mymap.invalidateSize();
    });
});

codeEditorDiv.on('show.bs.collapse', function () {
    if (sbShown) {
        $('#mapcontainer').find('h2').fadeIn();
    }
    $('#mapid').animate({ 'height': "-=25rem" }, function () {
        mymap.invalidateSize();
    });
});