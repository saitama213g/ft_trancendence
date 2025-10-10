import Fastify from "fastify";
import { Server as SocketIOServer, Socket } from "socket.io";
import { createServer } from "http";

const fastify = Fastify();

// Create HTTP server manually for Socket.IO
const httpServer = createServer(fastify.server);

// Attach Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // allow any origin for testing
  },
});

var clients: number[] = [];

// Listen for socket connections every time a client connects
io.on("connection", (socket: Socket) => {
  io.to(socket.id).emit("welcome", socket.id);
  console.log("User connected:", socket.id);
  // push socket.id to an array
  clients.push(Number(socket.id));

  // console.log("socket====>", socket);

  // socket.emit("welcome", "Hello from server!");

  socket.on("message", (msg) => {
    console.log("Received:", msg);
    // send to a specific user
    if (msg.id && clients.includes(Number(msg.id)))
      io.to(msg.id).emit("message", {message: msg.message, socketId: socket.id});
    else
      io.to(socket.id).emit("message", {message: msg.message, socketId: socket.id}); // broadcast to everyone including sender
    
    // socket.broadcast.emit("message", `User ${socket.id} said: ${msg}`);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Start HTTP server (Socket.IO listens here)
httpServer.listen(3001, () => {
  console.log("✅ Socket.IO listening on port 3001");
});
