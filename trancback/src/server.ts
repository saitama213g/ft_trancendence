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

// Listen for socket connections
io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  socket.emit("welcome", "Hello from server!");

  socket.on("message", (msg: string) => {
    console.log("Received:", msg);
    io.emit("message", msg); // broadcast to everyone including sender
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Start the server
// const start = async () => {
//   try {
//     await fastify.listen({ port: 3001 });
//     console.log("🚀 Server running at http://localhost:3001");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// Start HTTP server (Socket.IO listens here)
httpServer.listen(3001, () => {
  console.log("✅ Socket.IO listening on port 3001");
});

// start();
