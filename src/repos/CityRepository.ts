const log = require('../utils/log');
import {logError as logError} from '../utils/log';
import {city as city} from '../models';

export class CityRepository {
  constructor() {}

  /**
   * Gets all of the cities in this world.
   *
   * @return
   * @memberof CitRepository
   */
  async getCities() {
    throw new Error('no implmentation');
  }
}
