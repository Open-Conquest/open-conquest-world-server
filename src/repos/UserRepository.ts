import {log} from '../../utils/log';
const logError = require('../../utils/log').logError;
const user = require('../../models').user;

export class UserRepository {
  constructor() {}

  /**
   * Gets all of the map in this world.
   *
   * @return
   * @memberof UserRepository
   */
  getAllUsers() {
    throw new Error('no implmentation');
  }
}
