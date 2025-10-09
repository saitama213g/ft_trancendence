import { GamesService } from "../services/Game.service";
import { Game } from "../models/Game.model";
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/User.service";

export class GamesController {
  // private gamesRepository: GamesRepository;
  private gamesservice: GamesService;
  
  constructor() {
    // this.gamesRepository = new GamesRepository();
    this.gamesservice = new GamesService();
  }

  // Add a new game
  addGame(request: FastifyRequest): Game[] {
    const body = request.body as Partial<Game>;
    const { id } = request.user as { id: number | string };
    const user_id = Number(id);
  
    if (!user_id || isNaN(user_id) || user_id <= 0) {
      throw new Error("Invalid or missing user ID");
    }
  
    if (!body.opponent_id || isNaN(body.opponent_id) || !body.result) {
      throw new Error("Missing required fields");
    }
  
    const gameData: Game = {
      user_id,
      opponent_id: Number(body.opponent_id),
      score: Number(body.score),
      result: body.result,
    } as Game;
  
    this.gamesservice.addGame(gameData);
    return this.gamesservice.getGamesByUser(user_id);
  }

  getGamesByUser(request: FastifyRequest, reply: FastifyReply): Game[] {
    // You could filter, sort, or transform data here
    const { id } = request.user as { id: number | string };
    const user_id = Number(id);
    if (!user_id || isNaN(user_id) || user_id <= 0) {
      return [];
    }
    return this.gamesservice.getGamesByUser(user_id);
  }

  // Get a single game by ID
  getGameById(id: number): Game | undefined {
    return this.gamesservice.getGameById(id);
  }
  async getAllGames(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    try {
      const games = await this.gamesservice.getAllGames();
      return reply.send(games);
    } catch (error) {
      return reply.code(500).send({ error: (error as Error).message });
    }
  }
  // Delete a game
  deleteGame(request: FastifyRequest) {
    const { id } = request.params as { id: string };
    const gameId = Number(id);
  
    // Validate game ID
    if (!Number.isInteger(gameId) || gameId <= 0) {
      throw new Error("Invalid game ID");
    }
  
    // Call service to delete the game
    this.gamesservice.deleteGame(gameId);
  
    // Return a success message (could also return deleted game info if needed)
    return { message: "Game deleted successfully" };
  }
}
