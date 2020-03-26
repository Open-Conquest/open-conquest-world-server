/* eslint-disable require-jsdoc */
import {IArmyRepository} from '../IArmyRepository';
import {Army} from '../../domain/Army';
import {ArmyMapper} from '../../mappers/ArmyMapper';
import {ArmyRepositoryErrors} from '../ArmyRepositoryErrors';
import {log} from '../../../../shared/utils/log';
import {Player} from '../../domain/Player';

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
   * @param {Army} army
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async createArmy(army: Army): Promise<Army> {
    try {
      const dbArmy = await this.models.army.create({
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

  /**
   * Get a player's army.
   *
   * @param {Player} player
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async getArmyForPlayer(player: Player): Promise<Army> {
    try {
      // get player's army_id
      const dbPlayer = await this.models.player.findOne({
        where: {
          player_id: player.$id.$value,
        },
      });

      // if player doesn't exist in the database
      if (dbPlayer === null) {
        throw new Error(ArmyRepositoryErrors.NonexistentPlayer);
      }

      // if player's army_id is null then throw NonexistentArmy error
      if (dbPlayer.army_id === null) {
        throw new Error(ArmyRepositoryErrors.NonexistentArmy);
      }

      // get army from database
      const dbArmy = await this.models.army.findOne({
        where: {
          army_id: dbPlayer.army_id,
        },
        include: [{
          model: this.models.army_units,
          include: [{
            model: this.models.unit,
          }],
        }],
      });

      // map army db entity -> domain entity
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
