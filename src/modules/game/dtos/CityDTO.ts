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
  row: number;
  col: number;

  constructor(name: string, level: number, row: number, col: number) {
    this.name = name;
    this.level = level;
    this.row = row;
    this.col = col;
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

  public get $row(): number {
    return this.row;
  }

  public set $row(value: number) {
    this.row = value;
  }

  public get $col(): number {
    return this.col;
  }

  public set $col(value: number) {
    this.col = value;
  }
}
