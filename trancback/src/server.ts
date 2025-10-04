import Fastify from "fastify";
import sqlite3 from "sqlite3";
import userRoutes from "./routes/User.route";
// import "./types/fastify";
// / <reference path="../types/fastify.d.ts" />

const fastify = Fastify({ logger: true });

fastify.register(userRoutes, { prefix: "/users" });

fastify.setErrorHandler((error, request, reply) => {
  // Log the error for debugging purposes
  request.log.error(error);

  // Customize the response based on the error type or status code
  if (error.statusCode === 404) {
    reply.status(404).send({ message: 'Resource not found' });
  } else {
    // For other errors, send a generic internal server error
    reply.status(500).send({ message: 'Internal Server Error 1' });
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
