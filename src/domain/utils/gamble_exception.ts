export abstract class GambleException extends Error {
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

export class UserNotFoundException extends GambleException {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundException";
  }
}

export class InvalidBetException extends GambleException {
  constructor(message: string) {
    super(message);
    this.name = "InvalidBetException";
  }
}
