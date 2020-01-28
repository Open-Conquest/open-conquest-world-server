const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const user      = require('../../models').user;

class UserRepository {  
  
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @returns
   * @memberof UserRepository
   */
  getAllUsers() {
    throw new Error('no implmentation');
  }
}

module.exports = UserRepository