/* eslint-disable require-jsdoc */
export class HashedPassword {
  value: string

  constructor(hashedPassword: string) {
    this.value = hashedPassword;
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
