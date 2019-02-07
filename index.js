let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

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
http.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
