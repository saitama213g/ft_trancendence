import { DatabaseClient } from "./Database.client";
import { Friend } from "../models/Friend.model";

const db = DatabaseClient.getConnection();

export class FriendRepository {

  // Add a new friend relation
  addFriend(user_id: number, friend_id: number): Friend {
    const stmt = db.prepare(`
      INSERT INTO friends (user_id, friend_id, status)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(user_id, friend_id, "friends");

    const inserted = db.prepare(`
      SELECT * FROM friends WHERE id = ?
    `).get(result.lastInsertRowid);

    return inserted as Friend;
  }

  updateFriendStatus(user_id: number, friend_id: number, status: string): void {
    db.prepare(`
      UPDATE friends
      SET status = ?
      WHERE user_id = ? AND friend_id = ?
    `).run(status, user_id, friend_id);
  }

  // Get all friends of a specific user
  getFriends(user_id: number): Friend[] {
    const query = `
      SELECT 
        friends.id,
        CASE 
          WHEN friends.user_id = ? THEN friends.friend_id
          ELSE friends.user_id
        END as user_id,
        users.username,
        CASE 
          WHEN users.status = 'online' THEN 1
          ELSE 0
        END as online,
        COALESCE(users.last_active, CURRENT_TIMESTAMP) as lastActive,
        COALESCE(users.avatar_url, '/profile/default-avatar.svg') as avatar
      FROM friends
      JOIN users ON (
        CASE 
          WHEN friends.user_id = ? THEN users.id = friends.friend_id
          ELSE users.id = friends.user_id
        END
      )
      WHERE (friends.user_id = ? OR friends.friend_id = ?)
        AND friends.status = 'friends'
      ORDER BY users.status DESC, users.last_active DESC
    `;
    
    return db.prepare(query).all(user_id, user_id, user_id, user_id) as Friend[];
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
