$(document).ready(function(){
    // WebSocket
    var socket = io.connect();
    // neue Nachricht
    socket.on('chat', function (data) {
        var time = new Date(data.time);
        $('#chat_content').append(
            $('<li></li>').append(
                // Uhrzeit
                $('<span>').text('[' +
                    (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())
                    + ':' +
                    (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())
                    + '] '
                ),
                // Name
                $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
                // Text
                $('<span>').text(data.text))
        );
    });
    // Nachricht senden
    function send(){
        // Eingabefelder auslesen
        var name = $('#name').val();
        var text = $('#text').val();
        // Socket senden
        socket.emit('chat', { name: name, text: text });
        // Text-Eingabe leeren
        $('#text').val('');
    }
    // bei einem Klick
    $('#send').click(send);
    // oder mit der Enter-Taste
    $('#text').keypress(function (e) {
        if (e.which == 13) {
            send();
        }
    });
});