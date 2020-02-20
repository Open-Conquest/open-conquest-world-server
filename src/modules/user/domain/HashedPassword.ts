/* eslint-disable require-jsdoc */
export class HashedPassword {
  value: string

  constructor(hashedPassword: string) {
    this.value = hashedPassword;
  }

  getString(): string {
    return this.value;
  }
}
