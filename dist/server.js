"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const fastify = (0, fastify_1.default)({ logger: true });
// Open the database
const db = new sqlite3_1.default.Database("./src/database.sqlite");
// Create a table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
// create a sample user
db.run("INSERT INTO users (name) VALUES (?)", ["Alice"]);
// Define a route
fastify.get("/", async (request, reply) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
});
// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log("Server running on http://localhost:3000");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
