/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {ArmyUnits} from './ArmyUnits';
import { UnitType, Unit } from './Unit';
import {createArmyService} from '../services/createArmy';

export enum ArmyErrors {
  InsufficientUnits = 'Insufficient units in army for split',
  NoUnits = 'Army has no units of this type',
}

/**
 * Domain entity representation of a army.
 *
 * @export
 * @class Army
 * @extends {Entity}
 */
export class Army extends Entity {
  private units: Array<ArmyUnits>;

  /**
   * Create an instance of a army entity.
   *
   * @param {EntityID} id
   * @param {Array<ArmyUnits>} units
   * @memberof Army
   */
  constructor(id: EntityID, units: Array<ArmyUnits>) {
    super(id);
    this.units = units;
  }

  /**
   * Split this army into 2 armies with the latter comprised of the units
   * of the army passed.
   *
   * @param {Army} army
   * @memberof Army
   */
  split(army: Army) {
    // check if this army has enough units to perform the split
    for (let i = 0; i < army.$units.length; i++) {
      const type = army.$units[i].$unit.$type;
      const numUnits = army.numberOfUnits(type);
      this.removeUnits(type, numUnits);
    }
  }

  /**
   * Add count number of units of type to this army.
   *
   * @param {UnitType} type
   * @param {number} count
   * @return {void}
   * @memberof Army
   */
  addUnits(type: UnitType, count: number) {
    // if army already has some units of this type
    for (let i = 0; i < this.$units.length; i++) {
      if (this.$units[i].$unit.$type === type) {
        this.$units[i].$count += count;
      }
    }

    // if army doesn't have any units of this type
    // add new set of units to this army
    const unit = new Unit(type, null, null, null, null);
    const units = new ArmyUnits(null, this.$id, count, unit);
    this.$units.push(units);
  }

  /**
   * Get the number of units of type in this army.
   *
   * @param {UnitType} type
   * @return {number}
   * @memberof Army
   */
  numberOfUnits(type: UnitType): number {
    for (let i = 0; i < this.$units.length; i++) {
      if (this.$units[i].$unit.$type === type) {
        return this.$units[i].$count;
      }
    }
    return 0;
  }

  /**
   * Removes count number of units of type from this army.
   *
   * @param {UnitType} type
   * @param {number} count
   * @memberof Army
   */
  removeUnits(type: UnitType, count: number) {
    // check if there are enough units or if count in negative
    if (this.numberOfUnits(type) < count || count < 0) {
      throw new Error(ArmyErrors.InsufficientUnits);
    }

    for (let i = 0; i < this.$units.length; i++) {
      if (this.$units[i].$unit.$type === type) {
        // remove units
        this.$units[i].$count -= count;
        break;
      }
    }
  }

  public get $units(): Array<ArmyUnits> {
    return this.units;
  }

  public set $units(value: Array<ArmyUnits>) {
    this.units = value;
  }
}
