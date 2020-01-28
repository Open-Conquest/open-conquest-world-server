const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const map       = require('../../models').map;

class MapRepository {  
  
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @returns
   * @memberof MapRepository
   */
  getMapId() {
    throw new Error('no implmentation');
  }
}

module.exports = MapRepository