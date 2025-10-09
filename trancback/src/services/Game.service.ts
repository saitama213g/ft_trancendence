import { Game } from "../models/Game.model";
import { GamesRepository } from "../repositories/Games.repository";
import {UserRepository}  from "../repositories/User.repository";

export class GamesService {
  private gamesRepository: GamesRepository;
  private usersRepository: UserRepository;

  constructor() {
    this.gamesRepository = new GamesRepository();
    this.usersRepository = new UserRepository();
  }
    // Add a new game
    addGame(game: Game): number {
        // You could add validation or transformations here if needed
        const gameId = this.gamesRepository.addGame(game);
        return gameId as number;
    }
    // Get all games for a specific user
    getGamesByUser(user_id: number): Game[] {
        // Validate user ID
        if (!user_id || isNaN(user_id) || user_id <= 0) {
            throw new Error("Invalid user ID");
        }
    
        // Check if the user exists
        if (!this.usersRepository.userExists(user_id)) {
            throw new Error("User does not exist");
        }
    
        // Fetch and return games directly
        return this.gamesRepository.getGamesByUser(user_id);
    }
    async getAllGames() {
        return this.gamesRepository.getAllGames();
    }

    // Delete a game by ID
    deleteGame(id: number): { success: boolean; message: string } {
        const game = this.gamesRepository.getGameById(id);
        if (!game)
            return { success: false, message: "Game not found" };

        this.gamesRepository.deleteGame(id);
        return { success: true, message: "Game deleted successfully" };
    }

    // Get a single game by ID
    getGameById(id: number): Game {
        if (!id || isNaN(id) || id <= 0)
            throw new Error("Invalid game ID");
    
        const game = this.gamesRepository.getGameById(id);
        if (!game)
            throw new Error("Game not found");
        return game;
    }
}
