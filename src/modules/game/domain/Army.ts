/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {ArmyUnits} from './ArmyUnits';

/**
 * Domain entity representation of a army.
 *
 * @export
 * @class Army
 * @extends {Entity}
 */
export class Army extends Entity {
  private playerID: EntityID;
  private units: Array<ArmyUnits>;

  /**
   * Create an instance of a army entity.
   *
   * @param {EntityID} id
   * @param {PlayerID} playerID
   * @param {Array<ArmyUnits>} units
   * @memberof Army
   */
  constructor(id: EntityID, playerID: EntityID, units: Array<ArmyUnits>) {
    super(id);
    this.playerID = playerID;
    this.units = units;
  }

  public get $playerID(): EntityID {
    return this.playerID;
  }

  public set $playerID(value: EntityID) {
    this.playerID = value;
  }

  public get $units(): Array<ArmyUnits> {
    return this.units;
  }

  public set $units(value: Array<ArmyUnits>) {
    this.units = value;
  }
}
