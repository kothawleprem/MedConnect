const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://192.168.248.88:3000",
      "http://192.168.248.88:3001",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("req connection", socket.id)
  socket.emit("myId", socket.id);
  console.log(socket.id)


  socket.on("disconnectCall", () => {
    console.log("disconnecting!!")
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    console.log(data)

    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log("emitting accepted",data.to);
    const r = io.to(data.to)
    console.log(r)
    io.to(data.to).emit("callAccepted", data.signal);
    
  });
});

server.listen(5000, () => console.log("server is running on port 5000"));
