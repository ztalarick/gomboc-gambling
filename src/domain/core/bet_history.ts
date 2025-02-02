import { GambleRepository } from "../ports/out/gamble_repository";

import { User } from "./user";
import { Bet, BetOutcome } from "./bet";

export class BetHistory {
  bets: Bet[];

  constructor() {
    this.bets = [];
  }

  async read(user: User, repository: GambleRepository): Promise<BetHistory> {
    return await repository.readBetHistory(user);
  }

  atleastOneWinningBet(gameNumber: number): boolean {
    return this.bets.some(
      (bet) =>
        bet.outcome === BetOutcome.WIN && bet.user.gameNumber === gameNumber,
    );
  }
}
