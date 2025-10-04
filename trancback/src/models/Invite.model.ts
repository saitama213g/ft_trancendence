export interface Invite {
    id: number;                            // Primary key
    sender_id: number;                     // References users.id
    receiver_id: number;                   // References users.id
    status : "pending" | "accepted" | "rejected"; // Default = 'pending'
}
