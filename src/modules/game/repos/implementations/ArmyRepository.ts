/* eslint-disable require-jsdoc */
import {IArmyRepository} from '../IArmyRepository';
import {Army} from '../../domain/Army';
import {Player} from '../../domain/Player';
import {ArmyMapper} from '../../mappers/ArmyMapper';
import {ArmyRepositoryErrors} from '../ArmyRepositoryErrors';
import {log} from '../../../../shared/utils/log';
import {Tile} from '../../domain/Tile';

/**
 * Repository implementation for army entities.
 *
 * @export
 * @class ArmyRepository
 * @implements {IArmyRepository}
 */
export class ArmyRepository implements IArmyRepository {
  private models: any;
  private armyMapper: ArmyMapper;

  /**
   * Creates an instance of ArmyRepository.
   *
   * @param {*} models
   * @memberof ArmyRepository
   */
  constructor(models: any) {
    this.models = models;
    this.armyMapper = new ArmyMapper();
  }

  /**
   * Create a new army in the database for player.
   *
   * @param {Player} player
   * @param {Army} army
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async createArmy(player: Player, army: Army): Promise<Army> {
    try {
      const dbArmy = await this.models.army.create({
        player_id: player.$id.$value,
      });
      // map from db to domain and return
      return this.armyMapper.fromPersistence(dbArmy);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'player':
              throw new Error(ArmyRepositoryErrors.NonexistentPlayer);
          }
        default:
          throw err;
      }
    }
  }
}
