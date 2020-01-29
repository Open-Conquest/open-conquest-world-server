/**
 * Responsible for handling tile related requests.
 *
 * @class TileServices
 */

import {log} from '../utils/log';
import {logError as logError} from '../utils/log';
import {BaseServices} from './BaseServices';
import {models} from '../models';

export class TileServices extends BaseServices {
  constructor() {
    super();
    this.service = 'tile';
    // creates a tile of request operations -> handling methods
    this.handlers = {
      'get': this.getTile,
    };
  }

  /**
   * Gets all of the tiles associated with the tile for a world.
   *
   * @param {*} request
   * @return
   * @memberof TileServices
   */
  getTile(request) {
    log('Getting tile for request:' + request);
    // return new Promise(function(resolve, reject) {
    //   const row = request.data.tile_row;
    //   const col = request.data.tile_col;

    //   models.tile.findOne({
    //     where: {tile_row: row, tile_col: col},
    //   })
    //       .then((tile) => {
    //         resolve(tile);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
