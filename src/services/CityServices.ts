import {BaseServices} from './BaseServices';
import {models} from '../models';

/**
 *
 *
 * @export
 * @class CityServices
 * @extends {BaseServices}
 */
export class CityServices extends BaseServices {
  /**
   *Creates an instance of CityServices.
   * @memberof CityServices
   */
  constructor() {
    super();
    this.service = 'city';
    this.handlers = {
      'get': this.getCity,
    };
  }

  /**
   *
   *
   * @param {*} request
   * @memberof CityServices
   */
  getCity(request) {
    // return new Promise( function(resolve, reject) {
    //   models.city.findAll()
    //       .then((res) => {
    //         resolve(res);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
