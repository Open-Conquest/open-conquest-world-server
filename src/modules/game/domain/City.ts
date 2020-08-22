/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {CityName} from './CityName';
import {CityLevel} from './CityLevel';

/**
 * Domain entity representation of a city.
 *
 * @export
 * @class City
 * @extends {Entity}
 */
export class City extends Entity {
  private name: CityName;
  private level: CityLevel;
  private row: number;
  private col: number;

  /**
   * Create an instance of a city entity.
   *
   * @param {EntityID} id
   * @param {CityName} name
   * @param {CityLevel} level
   * @param {number} row
   * @param {number} col
   * @memberof City
   */
  constructor(id: EntityID, name: CityName, level: CityLevel, row: number, col: number) {
    super(id);
    this.$name = name;
    this.$level = level;
    this.$row = row;
    this.$col = col;
  }

  public get $name(): CityName {
    return this.name;
  }

  public get $level(): CityLevel {
    return this.level;
  }

  public set $name(value: CityName) {
    this.name = value;
  }

  public set $level(value: CityLevel) {
    this.level = value;
  }

  public get $row(): number {
    return this.row;
  }

  public get $col(): number {
    return this.col;
  }

  public set $row(value: number) {
    this.row = value;
  }

  public set $col(value: number) {
    this.col = value;
  }
}
