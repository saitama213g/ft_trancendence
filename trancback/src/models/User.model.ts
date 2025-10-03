export interface User {
id: number;             // Primary key
    username: string;       // Unique username
    avatar_url?: string;    // Optional profile picture
    level: number;          // Defaults to 1
    rank?: string;          // Optional rank (e.g., bronze, silver)
    xp: number;             // Defaults to 0
    status?: string;        // Optional (e.g., online, offline)
}
