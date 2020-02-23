/* eslint-disable require-jsdoc */

export class Username {
  private value: string;

  constructor(username: string) {
    if (username === null) {
      return null;
    }

    if (this.isValidUsername(username)) {
      this.value = username;
    } else {
      throw new Error('Invalid username, does not meet requirements');
    }
  }

  isValidUsername(username: string): boolean {
    if (username === null || username.length < 10 || username.length > 20) {
      return false;
    }
    return true;
  }

  getString(): string {
    return this.value;
  }
}

