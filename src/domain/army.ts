import {ArmyUnits} from './ArmyUnits';

/**
 * Domain model for an `Army`. An `Army` is a collection of `ArmyUnits` which
 * belongs to a `User`. An `Army` can be associated with a `March`. An `Army`
 * can be divided by its `ArmyUnits` into new `Army`s.
 *
 * @export
 * @class Army
 */
export class Army {
  private units: Array<ArmyUnits>;

  /**
   * Creates an instance of Army.
   *
   * @param {Array<ArmyUnits>} units
   * @memberof Army
   */
  constructor(units: Array<ArmyUnits>) {
    this.units = units;
  }

  /**
   * Returns an `Army`'s `ArmyUnits` array.
   *
   * @return {Array<ArmyUnits>}
   * @memberof Army
   */
  getUnits(): Array<ArmyUnits> {
    return this.units;
  }
}
