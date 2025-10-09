import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { GamesController } from "../controllers/Game.controller";
import { Game } from "../models/Game.model";

const gamesController = new GamesController();

export default async function gamesRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Get all games for a user
    fastify.get("/",{ preHandler: [fastify.authenticate] },  async (request: FastifyRequest, reply: FastifyReply) => {
      return gamesController.getGamesByUser(request, reply);
    });

    // Get a single game by ID
    // fastify.get("/:id",{ preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { id } = request.params as { id: string };
    //     const gameId = Number(id);

    //     if (!Number.isInteger(gameId) || gameId <= 0) {
    //     return reply.status(400).send({ message: "Invalid game ID" });
    //     }

    //     const game = gamesController.getGameById(gameId);
    //     if (!game) return reply.status(404).send({ message: "Game not found" });

    //     return reply.send(game);
    // });
    fastify.get("/games", async (request, reply) => {
      return gamesController.getAllGames(fastify, request, reply);
    });
    // Add a new game
    fastify.post("/add", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const games = gamesController.addGame(request);
        return reply.status(201).send({ message: "Game added successfully", games });
      } catch (error: any) {
        return reply.status(400).send({ message: error.message || "Failed to add game" });
      }
    });

    // Delete a game
    fastify.delete("/delete/:id", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = gamesController.deleteGame(request);
        return reply.status(200).send(result);
      } catch (error: any) {
        return reply.status(400).send({ message: error.message || "Failed to delete game" });
      }
    });
}
