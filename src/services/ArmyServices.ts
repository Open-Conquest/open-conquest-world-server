import {BaseServices} from './BaseServices';
import {models} from '../models';

/**
 *
 *
 * @export
 * @class ArmyServices
 * @extends {BaseServices}
 */
export class ArmyServices extends BaseServices {
  /**
   *Creates an instance of ArmyServices.
   * @memberof ArmyServices
   */
  constructor() {
    super();
    this.service = 'army';
    this.handlers = {
      'get': this.getArmy,
    };
  }

  /**
   *
   *
   * @param {*} request
   * @memberof ArmyServices
   */
  getArmy(request) {
    // return new Promise( function(resolve, reject) {
    //   models.army.findAll({
    //     include: {
    //       model: models.army_units,
    //       include: {
    //         model: models.unit,
    //       },
    //     },
    //   })
    //       .then((armies) => {
    //         resolve(armies);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
