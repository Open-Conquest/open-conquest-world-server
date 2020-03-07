/* eslint-disable require-jsdoc */
import {JWT} from '../schemas/JWT';

export class JWTDTO implements JWT {
  value: string;

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
