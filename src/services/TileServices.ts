import {BaseServices} from './BaseServices';
import {models} from '../models';
import {log} from '../utils/log';
import { ServiceNames } from './ServiceNames';
import { ITileRepository } from 'src/repos/ITileRepository';

/**
 *
 *
 * @export
 * @class TileServices
 * @extends {BaseServices}
 */
export class TileServices extends BaseServices {
  private tileRepository: ITileRepository;

  /**
   * Creates an instance of TileServices.
   * @param {ITileRepository} tileRepository
   * @memberof TileServices
   */
  constructor(tileRepository: ITileRepository) {
    super();
    this.tileRepository = tileRepository;
    this.serviceName = ServiceNames.Tile;
    // creates a tile of request operations -> handling methods
    this.handlers = {
      'get': this.getTile,
    };
  }

  /**
   * Gets all of the tiles associated with the tile for a world.
   *
   * @param {*} request
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
