const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "https://iridescent-bubblegum-c41511.netlify.app",
  },
});

io.on("connection", (socket) => {
  console.log(`user is connected with id ${socket.id}`);

  //join room
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`user is disconnect ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`server is running ${port}`);
});
