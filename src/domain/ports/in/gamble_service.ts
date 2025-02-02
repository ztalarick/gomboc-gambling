import { Bet } from "../../core/bet";
import { User } from "../../core/user";
import { BetHistory } from "../../core/bet_history";

import { GambleRepository } from "../out/gamble_repository";

export interface GambleService {
  repository: GambleRepository;

  getUser(userId: string | null): Promise<User>;
  bet(bet: Bet): Promise<Bet>;
  withdraw(user: User): Promise<User>;
  getBetHistory(user: User): Promise<BetHistory>;
}
