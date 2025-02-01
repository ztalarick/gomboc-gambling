import { GambleRepository } from "../ports/out/gamble_repository";

import { User } from "./user";
import { Bet, BetOutcome } from "./bet";

export class BetHistory {
  bets: Bet[];

  constructor() {
    this.bets = [];
  }

  async read(user: User, repository: GambleRepository): Promise<void> {
    const read_bet_history: BetHistory = await repository.readBetHistory(user);
    this.bets = read_bet_history.bets;
  }

  atleastOneWinningBet(): boolean {
    return this.bets.some((bet) => bet.outcome === BetOutcome.WIN);
  }
}
