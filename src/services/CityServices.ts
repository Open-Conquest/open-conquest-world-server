import {log} from '../utils/log';
const logError = require('../utils/log').logError;
import {BaseServices} from './BaseServices';
import {models} from '../models';

export class CityServices extends BaseServices {
  constructor() {
    super();
    this.service = 'city';
    this.handlers = {
      'get': this.getCity,
    };
  }

  getCity(request) {
    return new Promise( function(resolve, reject) {
      models.city.findAll()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
