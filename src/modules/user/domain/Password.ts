/* eslint-disable require-jsdoc */
export enum PasswordErrors {
  InvalidPassword = 'Invalid Password'
}

export class Password {
  private password: string;

  constructor(password: string) {
    if (!this.isValidPassword(password)) {
      throw new Error(PasswordErrors.InvalidPassword);
    }
    this.$password = password;
  }

  isValidPassword(password: string): boolean {
    if (password === null || password.length < 5 || password.length > 20) {
      return false;
    }
    return true;
  }

  getString(): string {
    return this.password;
  }

  public get $password(): string {
    return this.password;
  }

  public set $password(value: string) {
    this.password = value;
  }
}
