const log = require('../utils/log');
const logError = require('../utils/log').logError;
import {BaseServices} from './BaseServices';
const models = require('../models');

export class ArmyServices extends BaseServices {
  constructor() {
    super();
    this.service = 'army';
    this.handlers = {
      'get': this.getArmy,
    };
  }

  getArmy(request) {
    return new Promise( function(resolve, reject) {
      models.army.findAll({
        include: {
          model: models.army_units,
          include: {
            model: models.unit,
          },
        },
      })
          .then((armies) => {
            resolve(armies);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
