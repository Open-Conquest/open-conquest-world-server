import {Entity} from './Entity';

/**
 * Domain entity model of a unit.
 *
 * @export
 * @class Unit
 * @extends {Entity}
 */
export class Unit extends Entity {
  /**
   * Creates an instance of Unit.
   *
   * @param {number} id
   * @memberof Unit
   */
  constructor(id: number) {
    super(id);
  }
}
