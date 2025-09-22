// Run server desde la carpeta /chat with:
// node server.js

// Ir a webpage: http://127.0.0.1:3000/

const messageTypes = {
  LEFT: "left",
  RIGHT: "right",
  LOGIN: "login",
  LOGOUT: "logout",
};

const users = [];
let serverId = 1001;
let numberUsersConnected = 0;

console.log("numberUsersConnected:", numberUsersConnected);

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
  console.log("\nNew user connected with id:", socket.id);
  //console.log(socket.id);

  numberUsersConnected++;
  console.log("numberUsersConnected:", numberUsersConnected);

  const newUser = {
    serverId: serverId++,
    socketId: socket.id,
    isConnected: true,
    connectedDate: getDate(),
    username: undefined,
    loginDate: undefined,
    disconnectedDate: undefined,
  };

  console.log(newUser);
  users.push(newUser);

  showActiveConnections();

  socket.on("disconnect", () => {
    console.log("user disconnected");
    numberUsersConnected--;
    console.log("numberUsersConnected:", numberUsersConnected);
    console.log("Id disconnected:", socket.id);

    users.forEach((user) => {
      if (user.socketId == socket.id) {
        user.isConnected = false;
        user.disconnectedDate = getDate();
        io.emit("message", {
          author: user.username,
          type: messageTypes.LOGOUT,
          date: getDate(),
        });
        console.log(user);
      }
    });

    showActiveConnections();
  });

  socket.on("message", (message) => {
    console.log("message:", message);
    //   //Broadcast the message to everyone!
    io.emit("message", message);

    if (message.type === messageTypes.LOGIN) {
      users.forEach((user) => {
        if (user.socketId === socket.id) {
          user.loginDate = getDate();
          user.username = message.author;
          console.log(user);
        }
      });
    }
  });
});

function getDate() {
  Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || "0") + this : this;
  };
  // usage
  //=> 3..padLeft() => '03'
  //=> 3..padLeft(100,'-') => '--3'

  var d = new Date(),
    dateFormat =
      [
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
        d.getFullYear(),
      ].join("/") +
      " " +
      [
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft(),
      ].join(":");

  return dateFormat;
}

function showActiveConnections() {
  console.log("---------------------------------------");
  users.forEach((user) => {
    console.log(
      `${user.serverId} ${user.isConnected ? "L" : "D"} ${user.socketId} ${
        user.username
      }`
    );
  });
  console.log("---------------------------------------");
}
