import {ICityRepository} from '../../repos/ICityRepository';
import {City} from '../../domain/City';
import {User} from '../../../../modules/user/domain/User';
import {log} from '../../../../shared/utils/log';
import {CityFactory} from '../../factories/CityFactory';
import {Player} from '../../domain/Player';
import {CityRepositoryErrors} from '../../repos/CityRepositoryErrors';
import {CreateCityErrors} from './CreateCityErrors';
import {Tile} from '../../domain/Tile';
import {ITileRepository} from '../../repos/ITileRepository';
import {TileType} from '../../domain/TileType';

/**
 * Coordinate between domain and persistence layers to create city entities.
 *
 * @export
 * @class CityServices
 */
export class CreateCityService {
  private cityRepository: ICityRepository;
  private tileRepository: ITileRepository;
  private cityFactory: CityFactory;

  /**
   * Creates an instance of CityServices.
   *
   * @param {ICityRepository} cityRepository
   * @param {ITileRepository} tileRepository
   * @memberof CityServices
   */
  constructor(cityRepository: ICityRepository, tileRepository: ITileRepository) {
    this.cityRepository = cityRepository;
    this.tileRepository = tileRepository;
    this.cityFactory = new CityFactory();
  }

  /**
   * Create a new city for a player.
   *
   * @param {Player} player
   * @param {City} city
   * @param {Tile} tile
   * @return {Promise<City>}
   * @memberof CityServices
   */
  async createCity(player: Player, city: City, tile: Tile): Promise<City> {
    // check if a city already exists with name
    const existingCity = await this.cityRepository.getCity(city);
    if (existingCity !== null) {
      throw new Error(CreateCityErrors.DuplicateCityname);
    }

    // if the name isn't taken save city to database & return new city
    try {
      const savedCity = await this.cityRepository.createCity(
          player,
          city,
          tile,
      );
      // update the tile where the city was created
      tile.$type = TileType.City;
      await this.tileRepository.updateTile(tile);
      // return the newly created city
      return savedCity;
    } catch (err) {
      switch (err.message) {
        case CityRepositoryErrors.DuplicateCityname:
          throw new Error(CreateCityErrors.DuplicateCityname);
        case CityRepositoryErrors.NonexistentPlayer:
          throw new Error(CreateCityErrors.NonexistentPlayer);
        case CityRepositoryErrors.NonexistentTile:
          throw new Error(CreateCityErrors.NonexistentTile);
        default:
          log.error('Unknown error in CreateCityService', err.stack);
          throw new Error(CreateCityErrors.UnknownError);
      }
    }
  }
}
