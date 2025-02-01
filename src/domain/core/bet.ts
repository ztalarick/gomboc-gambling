import { GambleRepository } from "../ports/out/gamble_repository";
import {
  MIN_DICE_ROLL,
  MAX_DICE_ROLL,
  WINNINGS_MODIFIER,
} from "../utils/constants";

import { User } from "./user";

export enum DiceRoll {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
}

export enum BetOutcome {
  WIN = "win",
  LOSE = "lose",
}

export class Bet {
  user: User;
  amount: number;
  guess: DiceRoll;
  outcome: BetOutcome;
  timestamp: Date;

  constructor(user: User, amount: number, guess: DiceRoll) {
    this.user = user;
    this.amount = amount;
    this.guess = guess;
  }

  private isWinningBet(roll: DiceRoll): boolean {
    return this.guess === roll;
  }

  private static generateRandomRoll(): DiceRoll {
    const roll =
      Math.floor(Math.random() * (MAX_DICE_ROLL - MIN_DICE_ROLL + 1)) +
      MIN_DICE_ROLL;
    return roll as DiceRoll;
  }

  private static calculateWinnings(bet: Bet): number {
    return bet.amount * WINNINGS_MODIFIER;
  }

  private static calculateLosses(bet: Bet): number {
    return bet.amount;
  }

  private win(): number {
    const winnings = Bet.calculateWinnings(this);
    this.outcome = BetOutcome.WIN;
    this.user.balance += winnings;
    return winnings;
  }

  private lose(): number {
    const losses = Bet.calculateLosses(this);
    this.outcome = BetOutcome.LOSE;
    this.user.balance -= losses;
    return losses;
  }

  execute(): number {
    const roll: DiceRoll = Bet.generateRandomRoll();
    this.timestamp = new Date();
    if (this.isWinningBet(roll)) {
      return this.win();
    } else {
      return this.lose();
    }
  }

  async save(repository: GambleRepository): Promise<void> {
    return repository.saveBet(this);
  }
}
