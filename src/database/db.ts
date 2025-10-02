import Database from "better-sqlite3";

export class DatabaseClient {
  private db: Database.Database;

  constructor(filename: string = "database.sqlite") {
    this.db = new Database(filename);
    this.db.prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run("anwar", "anwar@gmail.com");
    // create data table users if not exists
  }

  getUserById(id: number) {
    return this.db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  }
  getAll() {
    return this.db.prepare("SELECT * FROM users").all();
  }

  addUser(name: string, email: string) {
    return this.db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run(name, email);
  }
}

// Singleton instance for the app
export const dbClient = new DatabaseClient();
