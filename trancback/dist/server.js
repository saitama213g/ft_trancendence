"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const fastify = (0, fastify_1.default)({ logger: true });
// open DB
const db = new sqlite3_1.default.Database("./src/database/database.sqlite");
// decorate Fastify instance with db
fastify.decorate("db", db);
// register routes
fastify.register(users_js_1.default, { prefix: "/users" });
// start server
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
