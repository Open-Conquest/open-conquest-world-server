import {Map} from '../../domain/Map';
import {models} from '../../models';

/**
 * Sequelize implementation of the `IMapRepository`
 * @class MapRepository
 */
export class MapRepository {
  /**
   * Creates an instance of MapRepository.
   * @memberof MapRepository
   */
  constructor() {}

  /**
   * Gets all of the maps in this world.
   * @return {Promise<Array<Map>>}
   * @memberof CitRepository
   */
  getAllMaps(): Promise<Array<Map>> {
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
