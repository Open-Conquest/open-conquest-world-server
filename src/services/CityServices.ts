import {BaseServices} from './BaseServices';
import {models} from '../models';
import { ServiceNames } from './ServiceNames';
import { ICityRepository } from 'src/repos/ICityRepository';

/**
 *
 *
 * @export
 * @class CityServices
 * @extends {BaseServices}
 */
export class CityServices extends BaseServices {
  private cityRepository: ICityRepository;

  /**
   * Creates an instance of CityServices.
   * @param {ICityRepository} cityRepository
   * @memberof CityServices
   */
  constructor(cityRepository: ICityRepository) {
    super();
    this.cityRepository = cityRepository;
    this.serviceName = ServiceNames.City;
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
