import { GamesRepository } from "../repositories/Games.repository";
import { Game } from "../models/Game.model";

export class GamesController {
  private gamesRepository: GamesRepository;

  constructor() {
    this.gamesRepository = new GamesRepository();
  }

  // Add a new game
  addGame(game: Game): number {
    // You could add validation or transformations here if needed
    const id = this.gamesRepository.addGame(game);
    return Number(id); 
  }

  // Get all games for a user
  getGamesByUser(user_id: number): Game[] {
    // You could filter, sort, or transform data here
    return this.gamesRepository.getGamesByUser(user_id);
  }

  // Get a single game by ID
  getGameById(id: number): Game | undefined {
    return this.gamesRepository.getGameById(id);
  }

  // Delete a game
  deleteGame(id: number): void {
    this.gamesRepository.deleteGame(id);
  }
}
