/* eslint-disable require-jsdoc */
import {ICityRepository} from '../ICityRepository';
import {City} from '../../domain/City';
import {Player} from '../../domain/Player';
import {CityMapper} from '../../mappers/CityMapper';
import {CityRepositoryErrors} from '../CityRepositoryErrors';
import {log} from '../../../../shared/utils/log';
import {Tile} from '../../domain/Tile';

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

  /**
   * Create a new city in the database for player.
   *
   * @param {Player} player
   * @param {City} city
   * @param {Tile} tile
   * @return {Promise<City>}
   * @memberof CityRepository
   */
  async createCity(player: Player, city: City, tile: Tile): Promise<City> {
    try {
      const dbCity = await this.models.city.create({
        city_name: city.$name.$value,
        city_level: city.$level.$value,
        player_id: player.$id.$value,
        tile_id: tile.$id.$value,
      });
      // map from db to domain and return
      return this.cityMapper.fromPersistence(dbCity);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          throw new Error(CityRepositoryErrors.DuplicateCityname);
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'player':
              throw new Error(CityRepositoryErrors.NonexistentPlayer);
            case 'tile':
              throw new Error(CityRepositoryErrors.NonexistentTile);
          }
        default:
          throw err;
      }
    }
  }

  async getCity(city: City): Promise<City> {
    const dbCity = await this.models.city.findOne({
      where: {
        city_name: city.$name.$value,
      },
    });
    return this.cityMapper.fromPersistence(dbCity);
  }

  getAllCities(city: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
