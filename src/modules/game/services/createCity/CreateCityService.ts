import {ICityRepository} from '../../repos/ICityRepository';
import {City} from '../../domain/City';
import {User} from '../../../../modules/user/domain/User';
import {log} from '../../../../shared/utils/log';
import {CityFactory} from '../../factories/CityFactory';
import {Player} from '../../domain/Player';
import {CityRepositoryErrors} from '../../repos/CityRepositoryErrors';
import {CreateCityErrors} from './CreateCityErrors';
import {createReadStream} from 'fs';

/**
 * Coordinate between domain and persistence layers to create city entities.
 *
 * @export
 * @class CityServices
 */
export class CreateCityService {
  private cityRepository: ICityRepository;
  private cityFactory: CityFactory;

  /**
   * Creates an instance of CityServices.
   *
   * @param {ICityRepository} cityRepository
   * @memberof CityServices
   */
  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
    this.cityFactory = new CityFactory();
  }

  /**
   * Create a new city for a player.
   *
   * @param {Player} player
   * @param {City} city
   * @return {Promise<Response>}
   * @memberof CityServices
   */
  async createCity(player: Player, city: City): Promise<City> {
    // check if a city already exists with name
    const existingCity = await this.cityRepository.getCity(city);
    if (existingCity !== null) {
      throw new Error(CreateCityErrors.DuplicateCityname);
    }

    // if the name isn't taken save city to database & return new city
    try {
      return await this.cityRepository.createCity(player, city);
    } catch (err) {
      switch (err.message) {
        case CityRepositoryErrors.DuplicateCityname:
          throw new Error(CreateCityErrors.DuplicateCityname);
        case CityRepositoryErrors.NonexistentPlayer:
          throw new Error(CreateCityErrors.NonexistentPlayer);
        default:
          log.error('Unknown error in CreateCityService', err.stack);
          throw new Error(CreateCityErrors.UnknownError);
      }
    }
  }
}
