/**
 * Created by Sven O. Pagel on 2017-01-31.
 */

var sbShown = true;
function toggleSidebar() {
    if(sbShown == true) {
        $('#sidebar').fadeToggle(800, function () {
            $('#main').removeClass('col-md-9');
            $('#main').removeClass('col-lg-10');
            $('#main').addClass('col-md-12');
            $('#main').addClass('col-lg-12');
            mymap.invalidateSize();
            sbShown = false;
        });
    } else {
        $('#main').removeClass('col-md-12');
        $('#main').removeClass('col-lg-12');
        $('#main').addClass('col-md-9');
        $('#main').addClass('col-lg-10');
        mymap.invalidateSize();
        $('#sidebar').fadeToggle(800);
        sbShown = true;
    };
}

$('#code-editor').on('hidden.bs.collapse', function () {
    if (!sbShown) {
        $('#mapcontainer h2').fadeOut();
    }
    $('#mapid').animate({ 'height': "+=25rem" }, function () {
        mymap.invalidateSize();
    });
})
$('#code-editor').on('show.bs.collapse', function () {
    if (sbShown) {
        $('#mapcontainer h2').fadeIn();
    }
    $('#mapid').animate({ 'height': "-=25rem" }, function () {
        mymap.invalidateSize();
    });
})