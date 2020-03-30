/* eslint-disable require-jsdoc */
export class Time {
  private value: string
  constructor(value: string) {
    this.value = value;
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    this.value = value;
  }
}
