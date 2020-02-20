/* eslint-disable require-jsdoc */

export class Password {
  private _password: string;

  constructor(password: string) {
    if (this.isValidPassword(password)) {
      this._password = password;
    } else {
      throw new Error('Invalid password, does not meet requirements');
    }
  }

  isValidPassword(password: string): boolean {
    if (password === null || password.length < 10 || password.length > 20) {
      return false;
    }
    return true;
  }

  getString(): string {
    return this._password;
  }
}
