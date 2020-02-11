import {Entity} from './Entity';

/**
 * Enum for tile terrain types.
 *
 * @export
 * @enum {number}
 */
export enum TileType {
  Grass = 1,
  Forest = 2,
  City = 3
}

/**
 * Domain model of a tile in `Map`.
 *
 * @export
 * @class Tile
 * @extends {Entity}
 */
export class Tile extends Entity {
  private tileType: TileType;
  private row: number;
  private col: number;
  /**
   *Creates an instance of Tile.
   * @param {number} id
   * @memberof Tile
   */
  constructor(id: number) {
    super(id);
  }
}
