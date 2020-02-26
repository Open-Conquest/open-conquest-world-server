/* eslint-disable require-jsdoc */
export class CityName {
  private value: string;

  constructor(value: string) {
    this.$value = value;
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    if (this.isValidCityName(value)) {
      this.value = value;
    }
  }

  private isValidCityName(name: string): boolean {
    if (name.length < 20) {
      return true;
    }
    return false;
  }
}
