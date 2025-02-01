import { Bet } from "../../../domain/core/bet";
import { User } from "../../../domain/core/user";
import { BetHistory } from "../../../domain/core/bet_history";
import { Database } from "sqlite3";

export class BetHistoryDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async readBetHistory(user: User): Promise<BetHistory> {
    return new BetHistory();
    // return new Promise((resolve, reject) => {
    //     this.db.all(
    //         "SELECT * FROM bets WHERE user_id = ?",
    //         [user.id],
    //         (err, rows) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             const bets = rows.map((row) => {
    //                 const bet = new Bet(user, row.amount, row.guess);
    //                 bet.outcome = row.outcome;
    //                 bet.timestamp = new Date(row.timestamp);
    //                 return bet;
    //             });
    //             const betHistory = new BetHistory();
    //             betHistory.bets = bets;
    //             resolve(betHistory);
    //         }
    //     );
    // });
  }
}
