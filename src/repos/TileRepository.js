const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const tile      = require('../../models').tile;

class TileRepository {  
  
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @returns
   * @memberof TileRepository
   */
  getAllTiles() {
    throw new Error('no implmentation');
  }
}

module.exports = TileRepository