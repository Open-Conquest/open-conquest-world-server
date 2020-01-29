import {log} from '../utils/log';
import {logError as logError} from '../utils/log';
import {BaseServices} from './BaseServices';
import {models} from '../models';

export class MarchServices extends BaseServices {
  constructor() {
    super();
    this.service = 'march';
    this.handlers = {
      'get': this.getMarch,
      'create': this.createMarch,
    };
  }

  /**
   * Query and return all of the marches and their associations
   * data. Should return an array of march json objects.
   *
   * @param {*} request
   * @return
   * @memberof MarchServices
   */
  getMarch(request) {
    // return new Promise( function(resolve, reject) {
    //   models.march.findAll({
    //     include: ['startTile', 'endTile'],
    //   })
    //       .then((marches) => {
    //         resolve(marches);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }

  /**
   * Handles requests for creating a new march. Responds with
   * json data about the new march.
   *
   * @param {*} request
   * @return
   * @memberof MarchServices
   */
  createMarch(request) {
    // return new Promise( function(resolve, reject) {
    //   // todo: validation to ensure that the march can be made
    //   // todo: actually making the new march
    //   // todo: return changes to army to client
    //   // todo: broadcasting when a new march is made

    //   const marchData = request.data;

    //   models.march.create({
    //     army_id: marchData.army_id,
    //     start_tile_id: marchData.start_tile_id,
    //     end_tile_id: marchData.end_tile_id,
    //   })
    //       .then((res) => {
    //         const march = res.dataValues;
    //         resolve(march);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
