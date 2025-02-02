import { Database } from "sqlite3";

import { DB_PATH } from "../../config";
import { Bet } from "../../domain/core/bet";
import { User } from "../../domain/core/user";
import { BetHistory } from "../../domain/core/bet_history";
import { GambleRepository } from "../../domain/ports/out/gamble_repository";

import { BetHistoryDao } from "./dao/bet_history_dao";
import { UserDao } from "./dao/user_dao";
import { BetDao } from "./dao/bet_dao";

export class SQLiteGambleRepository implements GambleRepository {
  private db: Database;

  constructor() {
    this.db = new Database(DB_PATH);
  }

  async saveBet(bet: Bet): Promise<Bet> {
    const bet_dao = new BetDao(this.db);
    return bet_dao.saveBet(bet);
  }

  async readUser(userId: string): Promise<User | null> {
    const user_dao = new UserDao(this.db);
    return user_dao.readUser(userId);
  }

  async saveUser(user: User): Promise<User> {
    const user_dao = new UserDao(this.db);
    return user_dao.saveUser(user);
  }

  async createUser(user: User): Promise<User> {
    const user_dao = new UserDao(this.db);
    return user_dao.createUser(user);
  }

  async readBetHistory(user: User): Promise<BetHistory> {
    const bet_history_dao = new BetHistoryDao(this.db);
    return bet_history_dao.readBetHistory(user);
  }
}
