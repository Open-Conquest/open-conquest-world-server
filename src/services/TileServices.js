/**
 * Responsible for handling tile related requests.
 *
 * @class TileServices
 */

const log           = require('../utils/log');
const logError      = require('../utils/log').logError;
const BaseServices  = require('./BaseServices');
const models        = require('../models');

class TileServices extends BaseServices {
  constructor() {
    super();
    this.service = 'tile';
    // creates a tile of request operations -> handling methods
    this.handlers = {
      'get': this.getTile
    }
  }

  /**
   * Gets all of the tiles associated with the tile for a world.
   *
   * @param {*} request
   * @returns
   * @memberof TileServices
   */
  getTile(request) {
    log('Getting tile for request:' + request);
    return new Promise(function (resolve, reject) {

      let row = request.data.tile_row;
      let col = request.data.tile_col;

      models.tile.findOne({
        where: {tile_row: row, tile_col: col}
      })
      .then(tile => {
        resolve(tile);
      })
      .catch(err => {
        reject(err);
      });

    });
  }
}

module.exports = TileServices