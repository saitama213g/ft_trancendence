import Fastify from "fastify";
import sqlite3 from "sqlite3";
import userRoutes from "./routes/users";
// import "./types/fastify";
// / <reference path="../types/fastify.d.ts" />

const fastify = Fastify({ logger: true });

fastify.register(userRoutes, { prefix: "/users" });

// start server
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
