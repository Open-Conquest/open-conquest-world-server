import {Entity} from './Entity';
import {EntityId} from "./Entity";

/**
 * Domain entity for world.
 *
 * @export
 * @class World
 * @extends {Entity}
 */
export class World extends Entity {
  /**
   * Creates an instance of World.
   *
   * @param {EntityId} id
   * @memberof World
   */
  constructor(id: EntityId) {
    super(id);
  }
}
