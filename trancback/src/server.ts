import Fastify from "fastify";
import userRoutes from "./routes/User.route";
import inviteRoutes from "./routes/Invite.routes";
import friendRoutes from "./routes/Friends.routes";
// import "./types/fastify";
// / <reference path="../types/fastify.d.ts" />

const fastify = Fastify({ logger: true });

fastify.register(userRoutes, { prefix: "/users" });
fastify.register(inviteRoutes, { prefix: "/invites" });
fastify.register(friendRoutes, { prefix: "/friends" });
// fastify.register(inviteRoutes, { prefix: "/invite" });

fastify.setErrorHandler((error, request, reply) => {
  // Log the full error (stack trace) to the console or logger
  request.log.error(error);

  // Detect 404s or custom errors
  if (error.statusCode === 404) {
    reply.status(404).send({ message: 'Resource not found' });
  } else {
    // Show detailed message only in dev mode
    const isDev = process.env.NODE_ENV !== 'production';
    reply.status(500).send({
      message: isDev ? error.message : 'Internal Server Error',
      stack: isDev ? error.stack : undefined,
    });
  }
});


// start server
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
