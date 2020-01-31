import {Entity} from './Entity';
import {EntityId} from './Entity';
import {Tile} from './Tile';

/**
 * Domain model for the world's map. A `Map` is a 2-d irregular
 * (height > width) hexagonal grid.
 *
 * @export
 * @class Map
 */
export class Map extends Entity {
  private tiles: Array<Tile>;
  /**
   * Creates an instance of Map.
   *
   * @param {EntityId} id
   * @memberof Map
   */
  constructor(id: EntityId) {
    super(id);
  }
}
