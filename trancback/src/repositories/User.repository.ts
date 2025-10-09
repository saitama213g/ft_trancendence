import {DatabaseClient} from "./Database.client";
import {User} from "../models/User.model";
import bcrypt from "bcrypt";

export class UserRepository {
  private db = DatabaseClient.getConnection();

  getUserById(id: number): User | undefined {
    return this.db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;
  }

  userExists(userId: number): boolean {
    const row = this.db.prepare(`SELECT 1 FROM users WHERE id = ?`).get(userId);
    return !!row;
  }

  getAll(): User[] {
    return this.db.prepare("SELECT username, id, rank, xp, avatar_url FROM users").all() as User[];
  } 

  addUser(username: string): User {
    const result = this.db.prepare("INSERT INTO users (username) VALUES (?)").run(username);
    return { id: result.lastInsertRowid as number, username, level: 1, xp: 0 };
  }

  async findByEmail(email: string) {
    return this.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  }

  getAllGames() {
    const stmt = this.db.prepare("SELECT * FROM games");
    return stmt.all();
  }

  deleteUserById(id: number) {
    const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
    return stmt.run(id);
  }

  async findByUsername(username: string) {
    return this.db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  }
  async createUser(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = this.db.prepare("INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)");
    const result = stmt.run(email, username, hashedPassword);
    return { id: result.lastInsertRowid, email, username };
  }
}
