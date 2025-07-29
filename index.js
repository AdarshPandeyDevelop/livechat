const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const { Server } = require("socket.io");

const server = http.createServer(app);
//this beloew io will handle the socket server
const io = new Server(server);
const PORT = 3000;

//Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(PORT, () => console.log(`connected at the port:${PORT}`));
