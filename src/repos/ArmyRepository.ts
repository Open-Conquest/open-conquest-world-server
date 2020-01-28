import {log} from '../../utils/log';
const logError = require('../../utils/log').logError;
const army = require('../../models').army;

/**
 * 
 *
 * @class ArmyRepository
 */
export class ArmyRepository {
  constructor(){
  }

  /**
   * Gets all of the armies in this world.
   *
   * @return Promise
   * @memberof ArmyRepository
   */
  getAllArmies(){
    return new Promise( function(resolve, reject) {
      army.findAll({})
          .then((armies) => {
            resolve(armies);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
