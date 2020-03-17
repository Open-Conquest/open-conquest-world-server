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
      // get tile city was created on
      const dbTile = await this.models.tile.findOne({
        where: {
          tile_id: dbCity.tile_id,
        },
      });
      // set city tile as dbTile, this is expected in the city mapper, the same
      // thing could be achieved by including the tile in the create res but it
      // doesn't seem like sequelize has something to do this, this is done in
      // the getCity method below with the "include" option
      dbCity.tile = dbTile;
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
      include: [this.models.tile],
    });
    return this.cityMapper.fromPersistence(dbCity);
  }

  async getAllCities(): Promise<Array<City>> {
    const dbCities = await this.models.city.findAll({
      include: [this.models.tile],
    });
    const cities = [];
    for (let i = 0; i < dbCities.length; i++) {
      cities.push(this.cityMapper.fromPersistence(dbCities[i]));
    }
    return cities;
  }
}
