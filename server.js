var connect = require("connect"),
    io = require("socket.io"),
    chatter = require("chatter");

var app = connect().use(connect.static("public")).listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
var chat_room = io.listen(app);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on("connection", function(socket) {
    chatter.connect_chatter({
        socket: socket,
        socket_id: socket.id,
        name: socket.handshake.query.name
    });
});