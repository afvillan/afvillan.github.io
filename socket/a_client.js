//import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:3000");

socket.on("message", (msg) => {
  console.log("message from server:", msg);
});

socket.emit("message", "Hello from this client!!");
