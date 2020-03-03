/* eslint-disable require-jsdoc */
import {ICityRepository} from '../ICityRepository';
import {City} from '../../domain/City';
import {Player} from '../../domain/Player';
import {CityMapper} from '../../mappers/CityMapper';
import {CityRepositoryErrors} from '../CityRepositoryErrors';
import {log} from '../../../../shared/utils/log';

/**
 * Repository implementation for city entities.
 *
 * @export
 * @class CityRepository
 * @implements {ICityRepository}
 */
export class CityRepository implements ICityRepository {
  private models: any;
  private cityMapper: CityMapper;

  /**
   * Creates an instance of CityRepository.
   *
   * @param {*} models
   * @memberof CityRepository
   */
  constructor(models: any) {
    this.models = models;
    this.cityMapper = new CityMapper();
  }

  async createCity(player: Player, city: City): Promise<City> {
    try {
      const dbCity = await this.models.city.create({
        city_name: city.$name.$value,
        city_level: city.$level.$value,
        player_id: player.$id.$value,
      });
      // map from db to domain and return
      return this.cityMapper.fromPersistence(dbCity);
    } catch (err) {
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(CityRepositoryErrors.DuplicateCityname);
      } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error(CityRepositoryErrors.NonexistentPlayer);
      } else {
        throw err;
      }
    }
  }

  async getCity(city: City): Promise<City> {
    try {
      const dbCity = await this.models.city.findOne({
        where: {
          city_name: city.$name.$value,
        },
      });
      return this.cityMapper.fromPersistence(dbCity);
    } catch (err) {
      // check if is a known error
      log.error('unknown error', err);
    }
  }

  getAllCities(city: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
