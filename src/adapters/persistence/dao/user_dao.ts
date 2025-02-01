import { Database } from "sqlite3";
import { User } from "../../../domain/core/user";

export class UserDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createUser(user: User): Promise<void> {
    // const query = `INSERT INTO users (id, balance, game_number) VALUES (?, ?, ?)`;
    // return new Promise((resolve, reject) => {
    //     this.db.run(query, [user.id, user.balance, user.game_number], (err) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve();
    //         }
    //     });
    // });
  }

  async readUser(userId: string | null): Promise<User | null> {
    return new User();
    // const query = `SELECT * FROM users WHERE id = ?`;
    // return new Promise((resolve, reject) => {
    //     this.db.get(query, [userId], (err, row) => {
    //         if (err) {
    //             reject(err);
    //         } else if (row) {
    //             const user = new User();
    //             user.id = row.id;
    //             user.balance = row.balance;
    //             user.game_number = row.game_number;
    //             resolve(user);
    //         } else {
    //             resolve(null);
    //         }
    //     });
    // });
  }

  async saveUser(user: User): Promise<void> {
    // const query = `UPDATE users SET balance = ?, game_number = ? WHERE id = ?`;
    // return new Promise((resolve, reject) => {
    //     this.db.run(query, [user.balance, user.game_number, user.id], (err) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve();
    //         }
    //     });
    // });
  }
}
