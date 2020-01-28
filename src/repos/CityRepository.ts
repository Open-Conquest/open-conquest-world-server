const log = require('../../utils/log');
const logError = require('../../utils/log').logError;
const city = require('../../models').city;

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
