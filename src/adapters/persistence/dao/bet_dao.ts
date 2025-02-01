import { Bet } from "../../../domain/core/bet";
import { Database } from "sqlite3";

export class BetDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async saveBet(bet: Bet): Promise<void> {
    // const query = `
    //     INSERT INTO bets (user_id, amount, guess, outcome, timestamp)
    //     VALUES (?, ?, ?, ?, ?)
    // `;
    // const params = [
    //     bet.user.id,
    //     bet.amount,
    //     bet.guess,
    //     bet.outcome,
    //     bet.timestamp.toISOString(),
    // ];
    // return new Promise((resolve, reject) => {
    //     this.db.run(query, params, function (err) {
    //         if (err) {
    //             return reject(err);
    //         }
    //         resolve();
    //     });
    // });
  }
}
