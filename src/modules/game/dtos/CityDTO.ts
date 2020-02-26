/* eslint-disable require-jsdoc */
import {City} from '../../../shared/schemas/City';

/**
 * DTO representation of City schema.
 *
 * @class CityDTO
 * @implements {City}
 */
export class CityDTO implements City {
  name: string;
  level: number;

  constructor(name: string) {
    this.name = name;
  }

  public get $name(): string {
    return this.name;
  }

  public set $name(value: string) {
    this.name = value;
  }

  public get $level(): number {
    return this.level;
  }

  public set $level(value: number) {
    this.level = value;
  }
}
