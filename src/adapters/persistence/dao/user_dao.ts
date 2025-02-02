import { Database } from "sqlite3";

import { UserNotFoundException } from "../../../domain/utils/gamble_exception";
import { User } from "../../../domain/core/user";

export class UserDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createUser(user: User): Promise<User> {
    const query =
      "INSERT INTO User (balance, gameNumber) VALUES (?, ?) RETURNING userId";
    return new Promise((resolve, reject) => {
      this.db.run(query, [user.balance, user.gameNumber], function (err) {
        if (err) {
          reject(err);
        } else {
          user.id = this.lastID.toString();
          resolve(user);
        }
      });
    });
  }

  async readUser(userId: string): Promise<User> {
    const query =
      "SELECT userId, balance, gameNumber FROM User WHERE userId = ?";
    return new Promise((resolve, reject) => {
      this.db.get(
        query,
        [userId],
        (err, row: { userId: string; balance: number; gameNumber: number }) => {
          if (err) {
            reject(err);
          } else if (row) {
            const user = new User();
            user.id = row.userId;
            user.balance = row.balance;
            user.gameNumber = row.gameNumber;
            resolve(user);
          } else {
            reject(new UserNotFoundException("No user with id " + userId));
          }
        },
      );
    });
  }

  async saveUser(user: User): Promise<User> {
    console.log("Saving user", user);
    const query =
      "UPDATE User SET balance = ?, gameNumber = ?, updatedAt = ? WHERE userId = ?";
    return new Promise((resolve, reject) => {
      this.db.run(
        query,
        [user.balance, user.gameNumber, new Date().toISOString(), user.id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        },
      );
    });
  }
}
