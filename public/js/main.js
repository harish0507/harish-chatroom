$(function() {
    var name = prompt("What is your name?");
    if (name == "" || name == null) { 
        name = "Annonymous User";
    }
    var socket = io.connect("http://127.0.0.1:8080,", { query: "name=" + name });
    var log_message = function(message) {
        var li = $("<li />").text(message);
        $("#chat-log").append(li);
    };
    socket.on("entrance", function(data) {
        log_message(data.message);
    });
    socket.on("exit", function(data) {
        log_message(data.message);
    });
    socket.on("chat", function(data) {
        log_message(data.message);
    });
    $("#chat-box").keypress(function(event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if(keycode == '13') {
            var msg = $("#chat-box").val();
            if (msg != "") {
                socket.emit("chat", { message: msg });
                $("#chat-box").val("");
            }
        }
    });
});