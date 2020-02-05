import {Army} from '../../domain/Army';
import {models} from '../../models';
import { ArmyUnits } from '../../domain/ArmyUnits';
import { log } from '../../utils/log';

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
  async getAllArmies(): Promise<Array<Army>> {
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

  /**
   * Creates a new army in the database.
   *
   * @param {Army} army
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async createArmy(army: Army): Promise<any> {
    return new Promise( function(resolve, reject) {
      models.army.create({
        user_id: 1,
      })
          .then((dbArmy) => {
            const armyUnits = army.getUnits();
            for (let i = 0; i < armyUnits.length; i++) {
              const units = armyUnits[i];
              // do something with the army
              models.army_units.create({
                army_id: dbArmy.army_id,
                unit_id: units.getUnitType(),
                unit_count: units.getCount(),
              });
            }
            resolve(dbArmy);
          })
          .then((res) => {
            log('i suspect this will happen before all units are created');
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
