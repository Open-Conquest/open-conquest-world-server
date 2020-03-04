/* eslint-disable require-jsdoc */
import {IArmyUnitsRepository} from '../IArmyUnitsRepository';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {Player} from '../../domain/Player';
import {ArmyUnitsMapper} from '../../mappers/ArmyUnitsMapper';
import {ArmyUnitsRepositoryErrors} from '../ArmyUnitsRepositoryErrors';
import {log} from '../../../../shared/utils/log';
import {Tile} from '../../domain/Tile';

/**
 * Repository implementation for armyunits entities.
 *
 * @export
 * @class ArmyUnitsRepository
 * @implements {IArmyUnitsRepository}
 */
export class ArmyUnitsRepository implements IArmyUnitsRepository {
  private models: any;
  private armyunitsMapper: ArmyUnitsMapper;

  /**
   * Creates an instance of ArmyUnitsRepository.
   *
   * @param {*} models
   * @memberof ArmyUnitsRepository
   */
  constructor(models: any) {
    this.models = models;
    this.armyunitsMapper = new ArmyUnitsMapper();
  }

  /**
   * Create a new armyunits in the database for player.
   *
   * @param {Player} player
   * @param {ArmyUnits} armyUnits
   * @return {Promise<ArmyUnits>}
   * @memberof ArmyUnitsRepository
   */
  async createArmyUnits(player: Player, armyUnits: ArmyUnits): Promise<ArmyUnits> {
    try {
      const dbArmyUnits = await this.models.army_units.create({
        player_id: player.$id.$value,
      });
      // map from db to domain and return
      return this.armyunitsMapper.fromPersistence(dbArmyUnits);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'armyunits':
              throw new Error(ArmyUnitsRepositoryErrors.NonexistentArmy);
          }
        default:
          throw err;
      }
    }
  }
}
