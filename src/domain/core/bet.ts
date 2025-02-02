import { GambleRepository } from "../ports/out/gamble_repository";
import {
  MIN_DICE_ROLL,
  MAX_DICE_ROLL,
  WINNINGS_MODIFIER,
} from "../utils/constants";
import { InvalidBetException } from "../utils/gamble_exception";

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
  roll: DiceRoll;
  outcome: BetOutcome;
  gameNumber: number;

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

  private validateBet(): void {
    if (this.amount > this.user.balance) {
      throw new InvalidBetException("Insufficient funds");
    }
    if (this.amount < 1) {
      throw new InvalidBetException("Invalid bet amount");
    }
    if (this.guess < MIN_DICE_ROLL || this.guess > MAX_DICE_ROLL) {
      throw new InvalidBetException("Invalid guess");
    }
  }

  execute(): number {
    this.validateBet();
    const roll: DiceRoll = Bet.generateRandomRoll();
    this.roll = roll;
    if (this.isWinningBet(roll)) {
      return this.win();
    } else {
      return this.lose();
    }
  }

  async save(repository: GambleRepository): Promise<Bet> {
    console.log("Saving bet");
    await this.user.save(repository);
    return repository.saveBet(this);
  }
}
