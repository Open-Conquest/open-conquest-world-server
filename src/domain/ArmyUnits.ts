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
   * @param {number} id
   * @param {UnitType} unitType
   * @param {number} count
   * @memberof ArmyUnits
   */
  constructor(id: number, unitType: UnitType, count: number) {
    super(id);
    this.unitType = unitType;
    this.count = count;
  }

  /**
   * Returns the `UnitType` for this `ArmyUnits`.
   *
   * @return {UnitType}
   * @memberof ArmyUnits
   */
  getUnitType(): UnitType {
    return this.unitType;
  }

  /**
   * Returns the number of units in this `ArmyUnits`.
   *
   * @return {number}
   * @memberof ArmyUnits
   */
  getCount(): number {
    return this.count;
  }
}
