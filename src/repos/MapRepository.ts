const log = require('../../utils/log');
const logError = require('../../utils/log').logError;
const map = require('../../models').map;

export class MapRepository {
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @return
   * @memberof MapRepository
   */
  getMapId() {
    throw new Error('no implmentation');
  }
}
