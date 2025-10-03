import Database from "better-sqlite3";

export class DatabaseClient {
  private static instance: Database.Database;

  static getConnection(filename: string = "src/database/database.sqlite") {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new Database(filename);
    }
    return DatabaseClient.instance;
  }
}
