import {User} from '../../domain/User';
import {Army} from '../../domain/Army';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {log} from '../../utils/log';
import { IArmyRepository } from '../IArmyRepository';

/**
 * Sequelize implementation of the `IArmyRepository`.
 * @class ArmyRepository
 */
export class ArmyRepository implements IArmyRepository {
  private models: any;

  /**
   * Creates an instance of ArmyRepository.
   * @param {*} models
   * @memberof ArmyRepository
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Gets all of the armies for a user.
   *
   * @param {User} user
   * @return {Promise<Array<Army>>}
   * @memberof ArmyRepository
   */
  async getAllArmies(user: User): Promise<Array<Army>> {
    const models = this.models;
    return new Promise( function(resolve, reject) {
      models.army.findAll({
        where: {
          user_id: user.getId(),
        },
      })
          .then((armies) => {
            resolve(armies);
            // const domainArmies = [];
            // for (let i = 0; i < armies.length; i++) {
            //   domainArmies.push(armies[i].toDomain());
            // }
            // resolve(domainArmies);
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
    const models = this.models;
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
    const models = this.models;
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
