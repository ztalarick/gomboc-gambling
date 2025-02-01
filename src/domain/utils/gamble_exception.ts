export class GambleException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GambleException";
  }
}

export class WithdrawGambleException extends GambleException {
  constructor(message: string) {
    super(message);
    this.name = "WithdrawGambleException";
  }
}
