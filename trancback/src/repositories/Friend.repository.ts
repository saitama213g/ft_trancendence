import { DatabaseClient } from "./Database.client";
import { Friend } from "../models/Friend.model";

const db = DatabaseClient.getConnection();

export class FriendRepository {

  // Add a new friend relation
  addFriend(user_id: number, friend_id: number, status: string = "accepted"): Friend {
    const stmt = db.prepare(`
      INSERT INTO friends (user_id, friend_id, status)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(user_id, friend_id, status);

    const inserted = db.prepare(`
      SELECT * FROM friends WHERE id = ?
    `).get(result.lastInsertRowid);

    return inserted as Friend;
  }

  // Get all friends of a specific user
  getFriends(user_id: number): Friend[] {
    return db
      .prepare(`SELECT * FROM friends WHERE user_id = ? OR friend_id = ?`)
      .all(user_id, user_id) as Friend[];
  }

  // Check if two users are already friends
  areFriends(user_id: number, friend_id: number): boolean {
    const row = db
      .prepare(
        `SELECT 1 FROM friends WHERE 
         (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)`
      )
      .get(user_id, friend_id, friend_id, user_id);
    return !!row;
  }

  // Remove a friend relationship
  removeFriend(user_id: number, friend_id: number): void {
    db.prepare(`
      DELETE FROM friends 
      WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)
    `).run(user_id, friend_id, friend_id, user_id);
  }
}
