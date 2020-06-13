/* eslint-disable require-jsdoc */
export class Time {
  private value: string

  constructor(value: string) {
    this.value = value;
  }

  static fromDate(date: Date): Time {
    // https://stackoverflow.com/a/44831930
    return new Time(date.toISOString().slice(0, 19).replace('T', ' '));
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    this.value = value;
  }
}
