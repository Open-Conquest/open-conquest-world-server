/* eslint-disable require-jsdoc */
import {IArmyUnitsRepository} from '../IArmyUnitsRepository';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {Army} from '../../domain/Army';
import {ArmyUnitsMapper} from '../../mappers/ArmyUnitsMapper';
import {ArmyUnitsRepositoryErrors} from '../ArmyUnitsRepositoryErrors';
import {log} from '../../../../shared/utils/log';
/**
 * Repository implementation for armyunits entities.
 *
 * @export
 * @class ArmyUnitsRepository
 * @implements {IArmyUnitsRepository}
 */
export class ArmyUnitsRepository implements IArmyUnitsRepository {
  private models: any;
  private armyUnitsMapper: ArmyUnitsMapper;

  /**
   * Creates an instance of ArmyUnitsRepository.
   *
   * @param {*} models
   * @memberof ArmyUnitsRepository
   */
  constructor(models: any) {
    this.models = models;
    this.armyUnitsMapper = new ArmyUnitsMapper();
  }

  /**
   * Save army units associated with a specific army in the database.
   *
   * @param {Army} army
   * @param {ArmyUnits} armyUnits
   * @return {Promise<ArmyUnits>}
   * @memberof ArmyUnitsRepository
   */
  async createArmyUnits(army: Army, armyUnits: ArmyUnits): Promise<ArmyUnits> {
    try {
      const dbArmyUnits = await this.models.army_units.create({
        army_id: army.$id.$value,
        unit_id: armyUnits.$unit.$type,
        unit_count: armyUnits.$count,
      });
      // map from db to domain and return
      return this.armyUnitsMapper.fromPersistence(dbArmyUnits);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'army':
              throw new Error(ArmyUnitsRepositoryErrors.NonexistentArmy);
            case 'unit':
              throw new Error(ArmyUnitsRepositoryErrors.NonexistentUnit);
          }
        default:
          throw err;
      }
    }
  }

  /**
   * Get an array of all the army units in an army.
   *
   * @param {Army} army
   * @return {Promise<Array<ArmyUnits>>}
   * @memberof ArmyUnitsRepository
   */
  async getArmyUnits(army: Army): Promise<Array<ArmyUnits>> {
    const dbArmyUnits = await this.models.army_units.findAll({
      where: {
        army_id: army.$id.$value,
      },
      include: [{
        model: this.models.unit,
      }],
    });
    // map the sequelize response into an array of ArmyUnits and return
    const armyUnits = [];
    for (let i = 0; i < dbArmyUnits.length; i++) {
      armyUnits.push(this.armyUnitsMapper.fromPersistence(dbArmyUnits[i]));
    }
    return armyUnits;
  }
}
