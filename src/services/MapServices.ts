/**
 * Responsible for handling map related requests.
 *
 * @class MapServices
 */

import {log} from '../utils/log';
const logError = require('../utils/log').logError;
import {BaseServices} from './BaseServices';
import {models} from '../models';

export class MapServices extends BaseServices {
  constructor() {
    super();
    this.service = 'map';
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
    return new Promise(function(resolve, reject) {
      models.map.findAll({
        where: {world_id: 1},
      })
          .then((map) => {
            if (map.length > 1) {
              throw new Error('Massive error there shouldn\'t be more than one map');
            }
            map = map[0];
            return models.tile.findAll({
              where: {map_id: map.map_id},
            });
          })
          .then((tiles) => {
            resolve(tiles);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
