/* eslint-disable require-jsdoc */

export class Playername {
  private value: string;

  constructor(playername: string) {
    if (this.isValidPlayername(playername)) {
      this.value = playername;
    } else {
      throw new Error('Invalid playername, does not meet requirements');
    }
  }

  isValidPlayername(playername: string): boolean {
    if (playername === null || playername.length < 10 || playername.length > 20) {
      return false;
    }
    return true;
  }

  getString(): string {
    return this.value;
  }
}

