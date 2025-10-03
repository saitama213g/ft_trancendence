export interface Game {
    id: number;             // Primary key
    user_id: number;        // References users.id
    opponent_name: string;  // Name of the opponent
    score?: number;         // Optional (can be null)
    result: "win" | "loss"; // Only allowed values
    created_at: string;     // Stored as DATETIME in SQLite
}
  