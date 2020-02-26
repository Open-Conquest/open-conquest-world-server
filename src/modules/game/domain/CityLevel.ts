/* eslint-disable require-jsdoc */
export class CityLevel {
  private value: number;

  constructor(value: number) {
    this.$value = value;
  }

  public get $value(): number {
    return this.value;
  }

  public set $value(value: number) {
    if (this.isValidLevel(value)) {
      this.value = value;
    } else {
      throw new Error('Invalid city level');
    }
  }

  private isValidLevel(value: number): boolean {
    if (value < 1 || value > 10) {
      return false;
    }
    return true;
  }
}
