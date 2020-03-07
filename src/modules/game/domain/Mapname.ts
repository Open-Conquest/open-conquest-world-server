/* eslint-disable require-jsdoc */

export class Mapname {
  private value: string;

  constructor(mapname: string) {
    if (this.isValidMapname(mapname)) {
      this.value = mapname;
    } else {
      throw new Error('Invalid mapname, does not meet requirements');
    }
  }

  isValidMapname(mapname: string): boolean {
    if (mapname === null || mapname.length < 1 || mapname.length > 20) {
      return false;
    }
    return true;
  }

  public get $value(): string {
    return this.value;
  }

  public set $value(value: string) {
    this.value = value;
  }
}

