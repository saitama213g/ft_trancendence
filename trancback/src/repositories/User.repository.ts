import {DatabaseClient} from "./Database.client";
import {User} from "../models/User.model";

export class UserRepository {
  private db = DatabaseClient.getConnection();

  getUserById(id: number): User | undefined {
    return this.db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;
  }

  getAll(): User[] {
    return this.db.prepare("SELECT * FROM users").all() as User[];
  }

  addUser(username: string): User {
    const result = this.db.prepare("INSERT INTO users (username) VALUES (?)").run(username);
    return { id: result.lastInsertRowid as number, username, level: 1, xp: 0 };
  }

  isEmailTaken(email: string): boolean {
    const user = this.db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    return user !== undefined;
  }

  isUsernameTaken(username: string): boolean {
    const user = this.db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    return user !== undefined;
  }
  
  searchUsers(query: string): User[] {
    return this.db
      .prepare("SELECT id, username, rank, xp, avatar_url FROM users WHERE username LIKE ? LIMIT 10")
      .all(`%${query}%`) as User[];
  }

  async createUser(email: string, username: string, password: string) {
    const result = this.db
      .prepare("INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)")
      .run(email, username, password);
    
    return {
      id: result.lastInsertRowid as number,
      email,
      username
    };
  }

  deleteUserById(id: number) {
    return this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
  }

  userExists(id: number): boolean {
    const user = this.db.prepare("SELECT 1 FROM users WHERE id = ?").get(id);
    return user !== undefined;
  }
}
