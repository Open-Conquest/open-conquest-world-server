import {Entity} from "./Entity";
import {EntityId} from "./Entity";

/**
 * `UnitType` is an enum for the discrete unit types in the game.
 *
 * @enum {number}
 */
export enum UnitType {
  Wizard = 1,
  Bear = 2,
}

/**
 * Domain model for a collection of an army's units of a type.
 *
 * @export
 * @class ArmyUnits
 */
export class ArmyUnits extends Entity {
  private unitType: UnitType;
  private count: number;

  /**
   * Creates an instance of ArmyUnits.
   *
   * @param {EntityId} id
   * @param {UnitType} unitType
   * @param {number} count
   * @memberof ArmyUnits
   */
  constructor(id: EntityId, unitType: UnitType, count: number) {
    super(id);
    this.unitType = unitType;
    this.count = count;
  }
}
