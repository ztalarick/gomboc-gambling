import { Bet } from "../../../domain/core/bet";
import { Database } from "sqlite3";

export class BetDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async saveBet(bet: Bet): Promise<Bet> {
    const query = `
        INSERT INTO Bet (userId, amount, guess, outcome, gameNumber, balance)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      bet.user.id,
      bet.amount,
      bet.guess,
      bet.outcome,
      bet.user.gameNumber,
      bet.user.balance,
    ];
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(bet);
      });
    });
  }
}
