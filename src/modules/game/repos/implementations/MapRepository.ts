/* eslint-disable require-jsdoc */
import {IMapRepository} from '../IMapRepository';
import {Map} from '../../domain/Map';
import {Player} from '../../domain/Player';
import {MapMapper} from '../../mappers/MapMapper';
import {log} from '../../../../shared/utils/log';

/**
 * Repository implementation for map entities.
 *
 * @export
 * @class MapRepository
 * @implements {IMapRepository}
 */
export class MapRepository implements IMapRepository {
  private models: any;
  private mapMapper: MapMapper;

  /**
   * Creates an instance of MapRepository.
   *
   * @param {*} models
   * @memberof MapRepository
   */
  constructor(models: any) {
    this.models = models;
    this.mapMapper = new MapMapper();
  }

  async createMap(map: Map): Promise<Map> {
    try {
      const dbMap = await this.models.map.create({
        map_id: map.$id.$value,
        map_name: map.$name.$value,
      });
      // map from db to domain and return
      return this.mapMapper.fromPersistence(dbMap);
    } catch (err) {
      // check to see what type of error was returned
      log.error(err.message);
      throw err;
    }
  }

  // async getMap(map: Map): Promise<Map> {
  //   try {
  //     const dbMap = await this.models.map.findOne({
  //       where: {
  //         map_name: map.$name.$value,
  //       },
  //     });
  //     return this.mapMapper.fromPersistence(dbMap);
  //   } catch (err) {
  //     // check if is a known error
  //     log.error('unknown error', err);
  //   }
  // }

  // getAllCities(map: any): Promise<any[]> {
  //   throw new Error("Method not implemented.");
  // }
}
