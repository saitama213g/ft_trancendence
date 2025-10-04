
export interface Friend {
    id: number;                           // Primary key
    user_id: number;                      // References users.id
    friend_id: number;                    // References users.id
    status: "accepted" | "pending" | "blocked"; // Default = 'pending'
}
