import {ICityRepository} from '../../repos/ICityRepository';
import {CityRepositoryErrors} from '../../repos/cityRepositoryErrors';
import {Player} from '../../domain/Player';
import {GetCitiesErrors} from './GetCitiesErrors';
import { City } from '../../domain/City';
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
   * Creates an instance of GetCitiesService.
   *
   * @param {ICityRepository} cityRepository
   * @memberof GetCitiesService 
   */
  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  /**
   * Get the cities for a player.
   *
   * @param {Player} player
   * @param {any} query
   * @return {Promise<Array<City>>}
   * @memberof PlayerServices
   */
  async getCities(player: Player): Promise<Array<City>> {
    return await this.cityRepository.getCities(player);
  }
}
