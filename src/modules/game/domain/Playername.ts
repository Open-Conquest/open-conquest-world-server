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
    if (playername == null) {
      return false;
    }
    return true;
  }

  getString(): string {
    return this.value;
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    this.value = value;
  }
}

