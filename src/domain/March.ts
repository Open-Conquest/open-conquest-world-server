import {Entity} from './Entity';
import {Tile} from './Tile';

/**
 * Domain model for representing a `March`.
 *
 * @export
 * @class March
 * @extends {Entity}
 */
export class March extends Entity {
  private startTile: Tile;
  private endTile: Tile;
  private startTime: Date;
  private endTime: Date;

  /**
   * Creates an instance of March.
   * @param {number} id
   * @param {Tile} startTile
   * @param {Tile} endTile
   * @param {Date} startTime
   * @param {Date} endTime
   * @memberof March
   */
  constructor(id: number, startTile: Tile, endTile: Tile, startTime: Date, endTime: Date) {
    super(id);
    this.startTile = startTile;
    this.endTile = endTile;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}