import {log} from '../utils/log';
import {logError as logError} from '../utils/log';
import {army as army} from '../models';

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
