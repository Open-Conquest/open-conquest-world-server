/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * Domain entity representation of a armyunits.
 *
 * @export
 * @class ArmyUnits
 * @extends {Entity}
 */
export class ArmyUnits extends Entity {
  private armyID: EntityID;

  /**
   * Create an instance of a armyunits entity.
   *
   * @param {EntityID} id
   * @param {PlayerID} armyID
   * @memberof ArmyUnits
   */
  constructor(id: EntityID, armyID: EntityID) {
    super(id);
    this.$armyID = armyID;
  }

  public get $armyID(): EntityID {
    return this.armyID;
  }

  public set $armyID(value: EntityID) {
    this.armyID = value;
  }
}
