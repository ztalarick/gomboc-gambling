import { Bet } from "../../core/bet";
import { User } from "../../core/user";
import { BetHistory } from "../../core/bet_history";

export interface GambleRepository {
    saveBet(bet: Bet): Promise<Bet>;
    readUser(userId: string): Promise<User | null>;
    saveUser(user: User): Promise<User>;
    createUser(user: User): Promise<User>;
    readBetHistory(user: User): Promise<BetHistory>;
}