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

  async getUser(userId: string | null): Promise<User> {
    if (!userId) {
      console.log("Creating new user");
      return await this.repository.createUser(new User());
    }
    console.log("Reading Existing User");
    return await this.repository.readUser(userId);
  }

  async bet(bet: Bet): Promise<Bet> {
    console.log("Placing bet");
    bet.execute();
    await bet.save(this.repository);
    return bet;
  }

  async withdraw(user: User): Promise<User> {
    await user.withdraw(this.repository);
    await user.save(this.repository);
    return user;
  }

  async getBetHistory(user: User): Promise<BetHistory> {
    return await this.repository.readBetHistory(user);
  }
}
