import { GambleRepository } from "../ports/out/gamble_repository";
import { STARTING_BALANCE } from "../utils/constants";
import { WithdrawGambleException } from "../utils/gamble_exception";

export class User {
  id: string | null;
  balance: number;
  gameNumber: number;

  constructor() {
    this.id = null;
    this.balance = STARTING_BALANCE;
    this.gameNumber = 1;
  }

  private async ableToWithdraw(repository: GambleRepository): Promise<boolean> {
    const bet_history = await repository.readBetHistory(this);
    return bet_history.atleastOneWinningBet(this.gameNumber);
  }

  async withdraw(repository: GambleRepository): Promise<void> {
    if (!(await this.ableToWithdraw(repository))) {
      throw new WithdrawGambleException("User has no winning bets");
    }
    this.balance = STARTING_BALANCE;
    this.gameNumber += 1;
  }

  async save(repository: GambleRepository): Promise<User> {
    return repository.saveUser(this);
  }

  async create(repository: GambleRepository): Promise<User> {
    return repository.createUser(this);
  }

  async readUser(repository: GambleRepository): Promise<User | null> {
    return repository.readUser(this.id);
  }
}
