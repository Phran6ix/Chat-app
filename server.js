const http = require("http");
const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

const app = require("./index");

app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("message", "Welcome to Chat");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
