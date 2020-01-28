const log           = require('../utils/log');
const logError      = require('../utils/log').logError;
const BaseServices  = require('./BaseServices');
const models        = require('../models');

class CityServices extends BaseServices {
  constructor() {
    super();
    this.service = 'city';
    this.handlers = {
      'get': this.getCity
    };
  }

  getCity(request) {
    return new Promise( function (resolve, reject) {
      models.city.findAll()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  }
}

module.exports = CityServices
