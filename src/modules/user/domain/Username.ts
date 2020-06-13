/* eslint-disable require-jsdoc */

export enum UsernameErrors {
  InvalidUsername = 'Invalid Username'
}

export class Username {
  private value: string;

  constructor(username: string) {
    if (!this.isValidUsername(username)) {
      throw new Error(UsernameErrors.InvalidUsername);
    }
    this.$value = username;
  }

  isValidUsername(username: string): boolean {
    if (username === null || username.length < 4 || username.length > 20) {
      return false;
    }
    return true;
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    this.value = value;
  }
}
