const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const march     = require('../../models').march;

class MarchRepository {  
  
  constructor() {}

  /**
   * Gets all of the marches in this world.
   *
   * @returns
   * @memberof MarchRepository
   */
  getAllMarches() {
    throw new Error('no implmentation');
  }
}

module.exports = MarchRepository