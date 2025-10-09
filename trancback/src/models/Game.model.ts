export interface Game {
    id: number;
    user_id: number;
    opponent_id: number;
    score?: number;
    result: "win" | "loss";
    created_at: string;
  }