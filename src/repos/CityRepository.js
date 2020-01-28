const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const city       = require('../../models').city;

class CityRepository {  
  
  constructor() {}

  /**
   * Gets all of the cities in this world.
   *
   * @returns
   * @memberof CitRepository
   */
  getCities() {
    throw new Error('no implmentation');
    models.city.findAll()
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  }
}

module.exports = MapRepository