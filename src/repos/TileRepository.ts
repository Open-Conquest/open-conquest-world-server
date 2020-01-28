import {log} from '../../utils/log';
import {logError as logError} from '../../utils/log';
import {tile as tile} from '../../models';

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
