import {Tile} from '../../domain/Tile';
import {models} from '../../models';

/**
 * A Sequelize implementation of the `ITileRepository`
 * @class TileRepository
 */
export class TileRepository {
  /**
   * Creates an instance of TileRepository.
   * @memberof TileRepository
   */
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @memberof TileRepository
   */
  getAllTiles() {
    throw new Error('no implmentation');
  }

  /**
   * Return a tile for row, col.
   *
   * @param {number} row
   * @param {number} col
   * @return {Promise<Tile>}
   * @memberof TileRepository
   */
  getTile(row: number, col: number) {
    return new Promise(function(resolve, reject) {
      models.tile.findOne({
        where: {tile_row: row, tile_col: col},
      })
          .then((tile) => {
            resolve(tile);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
