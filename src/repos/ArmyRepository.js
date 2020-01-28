const log       = require('../../utils/log');
const logError  = require('../../utils/log').logError;
const army      = require('../../models').army;

class ArmyRepository {  
  
  constructor() {}

  /**
   * Gets all of the armies in this world.
   *
   * @returns
   * @memberof ArmyRepository
   */
  getAllArmies() {
    
    return new Promise( function(resolve, reject) {
      army.findAll({
        include: { 
          model: models.army_units,
          include: {
            model: models.unit
          }
         }
      })
      .then(armies => {
        resolve(armies);
      })
      .catch(err => {
        reject(err);
      });
    });

  }

  /**
   * Gets an army with a specific id.
   *
   * @param {*} id
   * @memberof ArmyRepository
   */
  getArmyById(id) {
    throw new Error('no implementation');
  }

  /**
   * Gets the armies that belong to user.
   *
   * @param {*} userid
   * @memberof ArmyRepository
   */
  getArmiesForUser(userid) {
    throw new Error('no implementation');
  }

}

module.exports = ArmyRepository