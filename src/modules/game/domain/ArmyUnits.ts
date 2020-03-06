/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {Unit} from './Unit';

/**
 * Domain entity representation of a armyunits.
 *
 * @export
 * @class ArmyUnits
 * @extends {Entity}
 */
export class ArmyUnits extends Entity {
  private armyID: EntityID;
  private count: number;
  private unit: Unit;

  /**
   * Create an instance of a armyunits entity.
   *
   * @param {EntityID} id
   * @param {PlayerID} armyID
   * @param {number} count
   * @param {Unit} unit
   * @memberof ArmyUnits
   */
  constructor(id: EntityID, armyID: EntityID, count: number, unit: Unit) {
    super(id);
    this.armyID = armyID;
    this.count = count;
    this.unit = unit;
  }

  public get $armyID(): EntityID {
    return this.armyID;
  }

  public set $armyID(value: EntityID) {
    this.armyID = value;
  }

  public get $count(): number {
    return this.count;
  }

  public get $unit(): Unit {
    return this.unit;
  }

  public set $count(value: number) {
    this.count = value;
  }

  public set $unit(value: Unit) {
    this.unit = value;
  }
}
