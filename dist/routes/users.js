"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
async function userRoutes(fastify, options) {
    fastify.get("/", async (request, reply) => {
        return new Promise((resolve, reject) => {
            fastify.db.all("SELECT * FROM users", (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    });
}
