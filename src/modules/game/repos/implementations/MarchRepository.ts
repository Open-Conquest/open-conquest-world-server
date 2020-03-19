/* eslint-disable require-jsdoc */
import {IMarchRepository} from '../IMarchRepository';
import {March} from '../../domain/March';
import {Player} from '../../domain/Player';
import {MarchMapper} from '../../mappers/MarchMapper';
import {log} from '../../../../shared/utils/log';
import {Tile} from '../../domain/Tile';

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
        include: [
          {
            model: this.models.army,
          },
        ],
      });

      // march from db to domain and return
      return this.marchMapper.fromPersistence(dbMarchWithArmy);
    } catch (err) {
      // check to see what type of error was returned
      log.error(err.message);
      throw err;
    }
  }
}
