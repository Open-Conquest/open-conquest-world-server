import {City} from '../../domain/City';
import { ICityRepository } from '../ICityRepository';

/**
 * Sequelize implementation of the `ICityRepository`
 * @class CityRepository
 */
export class CityRepository implements ICityRepository {
  private models: any;

  /**
   * Creates an instance of CityRepository.
   * @param {*} models
   * @memberof CityRepository
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Gets all of the cities in this world.
   * @return {Promise<Array<City>>}
   * @memberof CitRepository
   */
  getAllCities(): Promise<Array<City>> {
    const models = this.models;
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
