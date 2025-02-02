import sqlite3 from "sqlite3";

export class InitializeDB {
  private db: sqlite3.Database;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Could not connect to database", err);
      } else {
        console.log("Connected to database");
      }
    });
  }

  public createTables(): void {
    const createUserTable = `
            CREATE TABLE IF NOT EXISTS User (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                balance REAL NOT NULL DEFAULT 1000,
                gameNumber INTEGER NOT NULL DEFAULT 1,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `;

    const createBetTable = `
            CREATE TABLE IF NOT EXISTS Bet (
                betId INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                amount REAL NOT NULL,
                guess INTEGER NOT NULL,
                outcome TEXT NOT NULL,
                gameNumber INTEGER NOT NULL,
                balance REAL NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES User(userId)
            );
        `;

    const createBetUserIdIndex = `
            CREATE INDEX IF NOT EXISTS idx_bet_userId ON Bet(userId);
        `;

    this.db.run(createUserTable, (err) => {
      if (err) {
        console.error("Could not create User table", err);
      } else {
        console.log("User table created");
      }
    });

    this.db.run(createBetTable, (err) => {
      if (err) {
        console.error("Could not create Bet table", err);
      } else {
        console.log("Bet table created");

        // Create index after Bet table is created
        this.db.run(createBetUserIdIndex, (err) => {
          if (err) {
            console.error("Could not create index on Bet table", err);
          } else {
            console.log("Index on Bet table created");
          }
        });
      }
    });
  }

  public close(): void {
    this.db.close((err) => {
      if (err) {
        console.error("Could not close database", err);
      } else {
        console.log("Database connection closed");
      }
    });
  }
}
