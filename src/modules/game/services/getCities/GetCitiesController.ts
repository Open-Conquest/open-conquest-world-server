import {UserDTO} from '../../../user/dtos/UserDTO';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {CityFactory} from '../../factories/CityFactory';
import {log} from '../../../../shared/utils/log';
import {Player} from '../../domain/Player';
import {User} from '../../../user/domain/User';
import {City} from '../../domain/City';
import {CityMapper} from '../../mappers/CityMapper';

export enum GetCitiesErrorResponses {
  InvalidQuery = 'Invalid query',
}

/**
 *
 *
 * @export
 * @class GetCitiesController
 * @extends {BaseServices}
 */
export class GetCitiesController {
  private getCitiesService: GetCitiesService;
  private cityFactory: CityFactory;
  private playerMapper: PlayerMapper;
  private cityMapper: CityMapper;

  /**
   * Creates an instance of GetCitiesController.
   *
   * @param {CreatePlayerService} createPlayerService
   * @param {GetTileForNewCityService} getTileForNewCityService
   * @param {CreateCityService} createCityService
   * @param {CreateResourcesForPlayerService} createResourcesForPlayerService
   * @param {CreateArmyService} createArmyService
   * @param {AddArmyToPlayerService} addArmyToPlayerService
   * @memberof PlayerServices
   */
  constructor(
      getCitiesService: GetCitiesService
  ) {
    this.getCitiesService = getCitiesService;
    this.cityFactory = new CityFactory();
    this.playerMapper = new PlayerMapper();
    this.cityMapper = new CityMapper();
  }

  /**
   * Get all the cities that match a query.
   *
   * @param {UserDTO} userDTO
   * @param {CreatePlayerRequestDTO} incomingDTO
   * @return {Promise<GetCitiesResponseDTO | GetCitiesErrorResponseDTO>}
   * @memberof PlayerServices
   */
  async getCities(
      userDTO: UserDTO,
      incomingDTO: GetCitiesDTO,
  ): Promise<GetCitiesResponseDTO | GetCitiesErrorResponseDTO> {
    try {
      const user: User = this.userMapper.fromDTO(userDTO);
      let player: Player = this.playerMapper.fromDTO(incomingDTO.$player);
      const query: CitiesQuery = incomingDTO.$query;

      const cities: Array<City> = this.getCitiesService.getCities(query);

      const cityDTOs = []
      for (let i = 0; i < cities.length; i++) {
        cityDTOs.push(this.cityMapper.toDTO(cities[i]));
      }
       
      return new GetCitiesResponseDTO(
        cityDTOs
      );
    } catch (err) {
      // check error message and throw appropriate error for caller to handle
      switch (err.message) {
        case GetCitiesErrors.InvalidQuery:
          throw err;
        default:
          log.error('Unknown error in GetCitiesController', err.stack);
          throw new Error(GetCitiesErrors.UnknownError);
      }
    }
  }
}
