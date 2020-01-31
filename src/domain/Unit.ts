import {Entity, EntityId} from './Entity';

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
   * @param {EntityId} id
   * @memberof Unit
   */
  constructor(id: EntityId) {
    super(id);
  }
}
