
// export interface Friend {
//     id: number;                           // Primary key
//     user_id: number;                      // References users.id
//     friend_id: number;                    // References users.id
//     status: "accepted" | "pending" | "blocked"; // Default = 'pending'
// }

export interface Friend {
  id: number;
  user_id: string;
  username: string;
  online: boolean;
  lastActive: string;
  avatar: string;
}