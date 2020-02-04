import {City} from '../../domain/City';
import {models} from '../../models';

/**
 * Sequelize implementation of the `ICityRepository`
 * @class CityRepository
 */
export class CityRepository {
  /**
   * Creates an instance of CityRepository.
   * @memberof CityRepository
   */
  constructor() {}

  /**
   * Gets all of the cities in this world.
   * @return {Promise<Array<City>>}
   * @memberof CitRepository
   */
  getAllCities(): Promise<Array<City>> {
    return new Promise( function(resolve, reject) {
      models.city.findAll()
          .then((cities) => {
            resolve(cities);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
