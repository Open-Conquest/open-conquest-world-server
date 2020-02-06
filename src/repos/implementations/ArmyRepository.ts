import {models} from '../../models';
import {User} from '../../domain/User';
import {Army} from '../../domain/Army';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {log} from '../../utils/log';

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
   * Gets all of the armies for a user.
   *
   * @param {User} user
   * @return {Promise<Array<Army>>}
   * @memberof ArmyRepository
   */
  async getAllArmies(user: User): Promise<Array<Army>> {
    return new Promise( function(resolve, reject) {
      models.army.findAll({
        where: {
          user_id: user.getId(),
        },
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
   * @param {User} user
   * @param {Army} army
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async createArmy(user: User, army: Army): Promise<any> {
    return new Promise( function(resolve, reject) {
      models.army.create({
        user_id: user.getId(),
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
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * Creates a new empty army.
   *
   * @param {User} user
   * @memberof ArmyRepository
   */
  async createEmptyArmy(user: User): Promise<Army> {
    return new Promise( function(resolve, reject) {
      models.army.create({
        user_id: user.getId(),
      })
          .then((army) => {
            // todo
            // map army to domain army
            // let newArmy = new Army();
            resolve(army);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
