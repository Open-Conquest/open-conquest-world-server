/* eslint-disable require-jsdoc */
import {IMarchRepository} from '../IMarchRepository';
import {March} from '../../domain/March';
import {Player} from '../../domain/Player';
import {MarchMapper} from '../../mappers/MarchMapper';
import {log} from '../../../../shared/utils/log';
import {Tile} from '../../domain/Tile';
import {MarchRepositoryErrors} from '../MarchRepositoryErrors';

/**
 * Repository implementation for march entities.
 *
 * @export
 * @class MarchRepository
 * @implements {IMarchRepository}
 */
export class MarchRepository implements IMarchRepository {
  private models: any;
  private marchMapper: MarchMapper;

  /**
   * Creates an instance of MarchRepository.
   *
   * @param {*} models
   * @memberof MarchRepository
   */
  constructor(models: any) {
    this.models = models;
    this.marchMapper = new MarchMapper();
  }

  async getAllMarches(): Promise<Array<March>> {
    // get all march entities from db
    const dbMarches = await this.models.march.findAll({
      include: [{
        model: this.models.tile,
        as: 'startTile',
      }, {
        model: this.models.tile,
        as: 'endTile',
      }],
    });

    // map march db entities -> domain entities
    const marches = [];
    for (let i = 0; i < dbMarches.length; i++) {
      const thisMarch = this.marchMapper.fromPersistence(dbMarches[i]);
      marches.push(thisMarch);
    }
    return marches;
  }

  async createMarch(march: March, start: Tile, end: Tile): Promise<March> {
    try {
      const dbMarch = await this.models.march.create({
        army_id: march.$army.$id.$value,
        start_tile_id: start.$id.$value,
        end_tile_id: end.$id.$value,
      });

      // get march with army
      const dbMarchWithArmy = await this.models.march.findOne({
        where: {
          march_id: dbMarch.march_id,
        },
        include: [{
          model: this.models.army,
          include: [{
            model: this.models.army_units,
            include: [{
              model: this.models.unit,
            }],
          }],
        }, {
          model: this.models.tile,
          as: 'startTile',
        }, {
          model: this.models.tile,
          as: 'endTile',
        }],
      });
      // march from db to domain and return
      return this.marchMapper.fromPersistence(dbMarchWithArmy);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'army':
              throw new Error(MarchRepositoryErrors.NonexistentArmy);
            case 'tile':
              throw new Error(MarchRepositoryErrors.NonexistentTile);
          }
        default:
          throw err;
      }
    }
  }
}
