var connect = require("connect"),
    io = require("socket.io"),
    chatter = require("chatter");

var app = connect().use(connect.static("public")).listen(8080);
var chat_room = io.listen(app);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on("connection", function(socket) {
    chatter.connect_chatter({
        socket: socket,
        name: socket.handshake.query.name
    });
});