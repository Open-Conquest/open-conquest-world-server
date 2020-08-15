import {ICityRepository} from '../../repos/ICityRepository';
import {CityRepositoryErrors} from '../../repos/cityRepositoryErrors';
import {Player} from '../../domain/Player';
import {User} from '../../../../modules/user/domain/User';
import {GetCitiesErrors} from './GetCitiesErrors';
import {log} from '../../../../shared/utils/log';

/**
 * An interface that handles getting cities from the persistance layer.
 *
 * @export
 * @class GetCitiesService
 */
export class GetCitiesService {
  private cityRepository: ICityRepository;

  /**
   * Creates an instance of PlayerServices.
   *
   * @param {ICityRepository} cityRepository
   * @memberof GetCitiesService 
   */
  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Create a new player for a user.
   *
   * @param {User} user
   * @param {Player} player
   * @param {any} query
   * @return {Promise<Response>}
   * @memberof PlayerServices
   */
  async createPlayer(user: User, player: Player, query: any): Promise<Array<City>> {
    try {
      // ensure query is valid

      // 4 types (map, player, tile, tile range)

      // query repository for cities
      return await this.cityRepository.getCities(user, player, query);
    } catch (err) {
      switch (err.message) {
        case GetCitiesErrors.InvalidQuery:
          throw new Error(GetCitiesErrors.InvalidQuery);
        default:
          throw err;
      }
    }
  }
}
