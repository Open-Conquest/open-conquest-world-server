/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityId';
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

  /**
   * Create an instance of a city entity.
   *
   * @param {EntityID} id
   * @param {CityName} name
   * @param {CityLevel} level
   * @memberof City
   */
  constructor(id: EntityID, name: CityName, level: CityLevel) {
    super(id);
    this.$name = name;
    this.$level = level;
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
}
