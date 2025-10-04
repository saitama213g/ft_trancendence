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
}
