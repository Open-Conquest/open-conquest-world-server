/* eslint-disable require-jsdoc */
import {IArmyRepository} from '../IArmyRepository';
import {Army, ArmyErrors} from '../../domain/Army';
import {ArmyMapper} from '../../mappers/ArmyMapper';
import {ArmyRepositoryErrors} from '../ArmyRepositoryErrors';
import {log} from '../../../../shared/utils/log';
import {Player} from '../../domain/Player';
import {UnitType} from '../../domain/Unit';

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
   * Update an army and all of its ArmyUnits.
   *
   * @param {Army} army
   * @return {Promise<Army>}
   * @memberof ArmyRepository
   */
  async updateArmy(army: Army) {
    try {
      // get all army units associated with this army from the database
      const dbArmyUnits = await this.models.army_units.findAll({
        where: {
          army_id: army.$id.$value,
        },
        include: [{
          model: this.models.unit,
        }],
      });

      // keep a list of the units that need to be updated
      const unitsToUpdate = army.$units;
      const updatedUnits = [];

      // update each of the army units that already have a db entry
      for (let i = 0; i < dbArmyUnits.length; i++) {
        const type = dbArmyUnits[i].unit.unit_id;
        const count = army.numberOfUnits(type);
        await dbArmyUnits[i].update({
          unit_count: count,
        });
        updatedUnits.push(type);
      }

      /*
        Create new army_unit entries for those that haven't been updated.
        This should happen for all of those who weren't already in the db.
      */
      while (updatedUnits.length < unitsToUpdate.length) {
        // find units that haven't been updated and create a new entry for them
        for (let i = 0; i < unitsToUpdate.length; i++) {
          const type = unitsToUpdate[i].$unit.$type;
          const count = unitsToUpdate[i].$count;
          // if these units have already been updated skip them
          if (updatedUnits.includes(type)) {
            continue;
          }
          // create entry in the database for these units
          await this.models.army_units.create({
            army_id: army.$id.$value,
            unit_id: type,
            unit_count: count,
          });
          updatedUnits.push(type);
        }
      }
    } catch (err) {
      switch (err.message) {
        case ArmyErrors.InsufficientUnits:
          throw new Error(ArmyRepositoryErrors.InsufficientUnits);
        default:
          switch (err.name) {
            case 'SequelizeForeignKeyConstraintError':
              switch (err.table) {
                case 'army':
                  throw new Error(ArmyRepositoryErrors.NonexistentArmy);
                case 'unit':
                  throw new Error(ArmyRepositoryErrors.NonexistentUnit);
              }
            default:
              throw err;
          }
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
