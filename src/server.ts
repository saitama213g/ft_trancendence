import Fastify from "fastify";
import sqlite3 from "sqlite3";

const fastify = Fastify({ logger: true });

// Open the database
const db = new sqlite3.Database("./src/database/database.sqlite");

// Create a table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
// create a sample user
db.run("INSERT INTO users (name) VALUES (?)", ["Alice"]);
// Define a route
fastify.get("/", async (request, reply) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
