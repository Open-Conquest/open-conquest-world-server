import {Army} from '../../domain/army';
import * as models from '../../models';

/**
 * Sequelize implementation of the `IArmyRepository`.
 * @class ArmyRepository
 */
export class ArmyRepository {
  /**
   * Creates an instance of ArmyRepository.
   * @memberof ArmyRepository
   */
  constructor() {}

  /**
   * Gets all of the armies in this world.
   * @return {Promise<Array<Army>>}
   * @memberof ArmyRepository
   */
  getAllArmies(): Promise<Array<Army>> {
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
