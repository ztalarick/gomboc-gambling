import { Bet, BetOutcome, DiceRoll } from "../../../domain/core/bet";
import { User } from "../../../domain/core/user";
import { BetHistory } from "../../../domain/core/bet_history";
import { Database } from "sqlite3";

export class BetHistoryDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async readBetHistory(user: User): Promise<BetHistory> {
    const query = `
      SELECT userId, amount, guess, outcome, gameNumber, balance
      FROM Bet
      WHERE userId = ?
      ORDER BY gameNumber, createdAt ASC
    `;
    const params = [user.id];

    return new Promise((resolve, reject) => {
      this.db.all(
        query,
        params,
        (
          err,
          rows: {
            amount: number;
            guess: number;
            outcome: string;
            gameNumber: number;
            balance: number;
          }[],
        ) => {
          if (err) {
            return reject(err);
          }
          const betHistory = new BetHistory();
          betHistory.bets = rows.map((row) => {
            const user_at_time = new User();
            user_at_time.id = user.id;
            user_at_time.balance = row.balance;
            user_at_time.gameNumber = row.gameNumber;

            const bet = new Bet(
              user_at_time,
              row.amount,
              row.guess as DiceRoll,
            );
            bet.outcome = row.outcome as BetOutcome;
            return bet;
          });
          resolve(betHistory);
        },
      );
    });
  }
}
