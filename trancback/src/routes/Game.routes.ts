import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { GamesController } from "../controllers/Game.controller";
import { Game } from "../models/Game.model";

const gamesController = new GamesController();

export default async function gamesRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Get all games for a user
    fastify.get("/user/:user_id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { user_id } = request.params as { user_id: string };
        const id = Number(user_id);

        if (!Number.isInteger(id) || id <= 0) {
        return reply.status(400).send({ message: "Invalid user ID" });
        }

        const games = gamesController.getGamesByUser(id);
        return reply.send(games);
    });

    // Get a single game by ID
    fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const gameId = Number(id);

        if (!Number.isInteger(gameId) || gameId <= 0) {
        return reply.status(400).send({ message: "Invalid game ID" });
        }

        const game = gamesController.getGameById(gameId);
        if (!game) return reply.status(404).send({ message: "Game not found" });

        return reply.send(game);
    });

    // Add a new game
    fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as Partial<Game>;

        if (!body.user_id || !body.opponent_name || body.score === undefined || !body.result) {
        return reply.status(400).send({ message: "Missing required fields" });
        }

        const gameId = gamesController.addGame(body as Game);
        return reply.status(201).send({ message: "Game added", gameId });
    });

    // Delete a game
    fastify.delete("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const gameId = Number(id);

        if (!Number.isInteger(gameId) || gameId <= 0) {
        return reply.status(400).send({ message: "Invalid game ID" });
        }

        gamesController.deleteGame(gameId);
        return reply.send({ message: "Game deleted" });
    });
}
