let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("chat message", msg => {
    console.log("message:" + msg);
  });
});
io.emit("some event", { for: "everyone" });
io.on("connection", socket => {
  socket.broadcast.emit("hi");
});
io.on("connection", socket => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});
http.listen(port, () => {
  console.log("listening on :" + port);
});
