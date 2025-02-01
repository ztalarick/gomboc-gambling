import { GambleRepository } from "../ports/out/gamble_repository";
import { STARTING_BALANCE } from "../utils/constants";
import { WithdrawGambleException } from "../utils/gamble_exception";

import { BetHistory } from "./bet_history";

export class User {
  id: string | null;
  balance: number;
  game_number: number;
  bet_history: BetHistory;

  constructor() {
    this.id = null;
    this.balance = STARTING_BALANCE;
  }

  private ableToWithdraw(repository: GambleRepository): boolean {
    this.bet_history = new BetHistory();
    this.bet_history.read(this, repository);
    return this.bet_history.atleastOneWinningBet();
  }

  withdraw(repository: GambleRepository): void {
    if (!this.ableToWithdraw(repository)) {
      throw new WithdrawGambleException("User has no winning bets.");
    }
    this.balance = STARTING_BALANCE;
    this.game_number += 1;
  }

  async save(repository: GambleRepository): Promise<void> {
    return repository.saveUser(this);
  }

  async create(repository: GambleRepository): Promise<void> {
    return repository.createUser(this);
  }

  async readUser(repository: GambleRepository): Promise<User | null> {
    return repository.readUser(this.id);
  }
}
