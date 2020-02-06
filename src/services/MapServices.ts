import {BaseServices} from './BaseServices';
import {models} from '../models';
import { ServiceNames } from './ServiceNames';

/**
 *
 *
 * @export
 * @class MapServices
 * @extends {BaseServices}
 */
export class MapServices extends BaseServices {
  /**
   *Creates an instance of MapServices.
   * @memberof MapServices
   */
  constructor() {
    super();
    this.serviceName = ServiceNames.Map;
    this.handlers = {
      'get': this.getMap,
    };
  }

  /**
   * Gets all of the tiles associated with the map for a world.
   *
   * @param {*} request
   * @return
   * @memberof MapServices
   */
  getMap(request) {
    // return new Promise(function(resolve, reject) {
    //   models.map.findAll({
    //     where: {world_id: 1},
    //   })
    //       .then((map) => {
    //         if (map.length > 1) {
    //           throw new Error('Massive error there shouldn\'t be more than one map');
    //         }
    //         map = map[0];
    //         return models.tile.findAll({
    //           where: {map_id: map.map_id},
    //         });
    //       })
    //       .then((tiles) => {
    //         resolve(tiles);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
