import {ICityRepository} from '../../repos/ICityRepository';
import {City} from '../../domain/City';
import {User} from '../../../../modules/user/domain/User';
import {log} from '../../../../shared/utils/log';

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
   * Create a new city for a user.
   *
   * @param {User} user
   * @param {City} city
   * @return {Promise<Response>}
   * @memberof CityServices
   */
  async createCity(user: User, city: City): Promise<City> {
    // see if a city with the name exists
    const existingCity = await this.cityRepository.getCity(city);
    if (existingCity !== null) {
      // city with name already exists
      throw new Error('Cityname taken');
    }

    // if the name isn't taken save city to database & return new city
    return await this.cityRepository.createCity(user, city);
  }
}
