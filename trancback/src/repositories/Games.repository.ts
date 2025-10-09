import {DatabaseClient} from "./Database.client";
import {Game} from "../models/Game.model";

export class GamesRepository {
    private db = DatabaseClient.getConnection();

    // Add a new game
    addGame(game: Game) {
        const stmt = this.db.prepare(
        `INSERT INTO games (user_id, opponent_id, score, result) VALUES (?, ?, ?, ?)`
        );
        const info = stmt.run(game.user_id, game.opponent_id, game.score, game.result);
        return info.lastInsertRowid;
    }

    // Get all games for a user
    getGamesByUser(user_id: number): Game[] {
        const stmt = this.db.prepare(`SELECT * FROM games WHERE user_id = ? ORDER BY created_at DESC`);
        return stmt.all(user_id)as Game[];
    }

    // Get a single game by ID
    getGameById(id: number): Game | undefined {
        const stmt = this.db.prepare(`SELECT * FROM games WHERE id = ?`);
        return stmt.get(id) as Game | undefined;
    }

    // Delete a game
    deleteGame(id: number) {
        const stmt = this.db.prepare(`DELETE FROM games WHERE id = ?`);
        return stmt.run(id);
    }

    getAllGames() {
        const stmt = this.db.prepare("SELECT * FROM games");
        return stmt.all();
    }
}
