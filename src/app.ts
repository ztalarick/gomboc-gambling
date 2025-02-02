import { Server } from "./server";
import { InitializeDB } from "./db";
import { PORT, DB_PATH } from "./config";

function main(): void {
  try {
    const init_db = new InitializeDB(DB_PATH);
    init_db.createTables();
    init_db.close();

    const server = new Server();
    server.start(PORT);
  } catch (error) {
    console.error("Failed to initialize the application:", error);
  }
}

main();
