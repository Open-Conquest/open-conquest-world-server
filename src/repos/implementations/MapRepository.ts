import {Map} from '../../domain/Map';
import { IMapRepository } from '../IMapRepository';

/**
 * Sequelize implementation of the `IMapRepository`
 * @class MapRepository
 */
export class MapRepository implements IMapRepository {
  private models: any;

  /**
   * Creates an instance of MapRepository.
   * @param {*} models
   * @memberof MapRepository
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Gets all of the maps in this world.
   * @return {Promise<Array<Map>>}
   * @memberof CitRepository
   */
  getAllMaps(): Promise<Array<Map>> {
    const models = this.models;
    return new Promise( function(resolve, reject) {
      models.map.findAll()
          .then((maps) => {
            resolve(maps);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
