// import fastify from "fastify";
// import userRoutes from "./routes/User.route";
// import inviteRoutes from "./routes/Invite.routes";
// import friendRoutes from "./routes/Friend.routes";
// import gameRoutes from "./routes/Game.routes";
// import fjwt from '@fastify/jwt';
// import authenticate from "./authenticate";
// import authroutes from "./routes/Auth.routes";

// declare module 'fastify' {
//   interface FastifyInstance {
//     authenticate: any;
//   }
// }

// const app = fastify({ logger: true });
// app.register(fjwt, {
//   secret: 'your-secret-key'
// });

// app.register(userRoutes, { prefix: "/users" }); 
// app.register(inviteRoutes, { prefix: "/invites" });
// app.register(friendRoutes, { prefix: "/friends" });
// app.register(gameRoutes, { prefix: "/games" });
// app.register(authroutes, { prefix: "/login" });

// app.decorate("authenticate", authenticate);
// app.setErrorHandler((error, request, reply) => {
//   // Log the full error (stack trace) to the console or logger
//   request.log.error(error);

//   // Detect 404s or custom errors
//   if (error.statusCode === 404) {
//     reply.status(404).send({ message: 'Resource not found' });
//   } else {
//     // Show detailed message only in dev mode
//     const isDev = process.env.NODE_ENV !== 'production';
//     reply.status(500).send({
//       message: isDev ? error.message : 'Internal Server Error',
//       stack: isDev ? error.stack : undefined,
//     });
//   }
// });

// // start server
// const start = async () => {
//   try {
//     await app.listen({ port: 4000 });
//     console.log("Server running on http://localhost:4000");
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// };

// start();
import Fastify from "fastify";
// @ts-ignore
import fastifyIO from "fastify-socket.io";
import { Socket } from "socket.io";

const fastify = Fastify();

// Register socket.io plugin
fastify.register(fastifyIO);

// Wait until Fastify is ready before using .io
fastify.ready().then(() => {
  fastify.io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.emit("welcome", "Hello from server!");

    socket.on("message", (msg: string) => {
      console.log("Received:", msg);
      socket.broadcast.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) throw err;
  console.log(`✅ Server running at ${address}`);
});

