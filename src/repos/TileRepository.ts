const log = require('../../utils/log');
const logError = require('../../utils/log').logError;
const tile = require('../../models').tile;

export class TileRepository {
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @return
   * @memberof TileRepository
   */
  getAllTiles() {
    throw new Error('no implmentation');
  }
}
