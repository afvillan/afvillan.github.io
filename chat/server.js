// Run server desde la carpeta /chat with:
// node server.js

// Ir a webpage: http://127.0.0.1:3000/

const express = require("express");
const path = require("path");

const app = express();

const http = require("http").Server(app);
// console.log(http);
const io = require("socket.io")(http);

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
//   //res.sendFile(path.join(__dirname, "public/index.html"));
// });

// app.listen(3000, () => {
//   console.log("listening on port 3000");
// });

http.listen(3000, () => {
  console.log("listening on port 3000");
});

io.on("connection", (socket) => {
  console.log("New user connected with id:", socket.id);
  //console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (message) => {
    console.log("message:", message);
    //Broadcast the message to everyone!
    io.emit("message", message);
  });
});
