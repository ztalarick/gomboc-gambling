import { GambleException } from "../../domain/utils/gamble_exception";
import { GambleRepository } from "../../domain/ports/out/gamble_repository";
import { GambleService } from "../../domain/ports/in/gamble_service";

import { User } from "../../domain/core/user";
import { Bet } from "../../domain/core/bet";
import { BetHistory } from "../../domain/core/bet_history";

export class RestGambleService implements GambleService {
  repository: GambleRepository;

  constructor(repository: GambleRepository) {
    this.repository = repository;
  }

  async getUser(userId: string | null): Promise<User | void> {
    if (!userId) {
      this.repository.createUser(new User());
    }
    return this.repository.readUser(userId);
  }

  async bet(bet: Bet): Promise<number> {
    const result: number = bet.execute();
    this.repository.saveBet(bet);
    return result;
  }

  async withdraw(user: User): Promise<void> {
    user.withdraw(this.repository);
    user.save(this.repository);
  }

  async getBetHistory(user: User): Promise<BetHistory> {
    return this.repository.readBetHistory(user);
  }
}
