const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
users = [];
connections = [];
io.on("connection", function (socket) {
  connections.push(socket);
  console.log("connected : %s socket connectd", connections.length);
  //   console.log("A user connected");
  // socket.on("setUsername", function (data) {
  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("disconnected: %s socket disconnectd", connections.length);
    // console.log(data);
    // if (users.indexOf(data) > -1) {
    //   socket.emit(
    //     "userExists",
    //     data + " username is taken! Try some other username."
    //   );
    // } else {
    //   users.push(data);
    //   socket.emit("userSet", { username: data });
    // }
  });
  socket.on("send message", function (data) {
    console.log(data);
    //Send message to everyone
    io.emit("new message", { msg: data });
  });
});
http.listen(3000, function () {
  console.log("server listening on localhost:3000");
});
