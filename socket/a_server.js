import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "http://127.0.0.1:3001", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these methods
  },
});

console.log("\n\n-----------------------------------------------");
console.log("Socket Server running at ws://127.0.0.1:3000");
console.log("-----------------------------------------------\n");

// io.close(() => {
//   console.log("Socket.IO server closed and all clients disconnected.");
// });

io.on("connection", (socket) => {
  //send a message to the client
  console.log("\nUser connected with id:", socket.id);
  socket.emit("message", "Welcome to my server.");

  socket.on("message", (msg) => {
    console.log("\nmessage from client:", msg);
  });

  socket.on("disconnect", (reason) => {
    console.log(
      `\nUser with id: ${socket.id} disconnected. Reason: "${reason}"`
    );
  });

  // socket.onAny((eventName, ...args) => {
  //   console.log(`Received event: "${eventName}" with args:`, args);
  // });
});
