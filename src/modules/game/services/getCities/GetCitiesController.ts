import {UserDTO} from '../../../user/dtos/UserDTO';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {CityFactory} from '../../factories/CityFactory';
import {log} from '../../../../shared/utils/log';
import {Player} from '../../domain/Player';
import {User} from '../../../user/domain/User';
import {City} from '../../domain/City';
import {CityMapper} from '../../mappers/CityMapper';
import { GetCitiesResponseDTO } from './GetCitiesResponseDTO';
import { GetCitiesService } from './GetCitiesService';
import { GetCitiesErrorResponseDTO } from './GetCitiesErrorResponseDTO';
import { GetCitiesRequestDTO } from './CreatePlayerRequestDTO';
import { UserMapper } from 'src/modules/user/mappers/UserMapper';
import { DoesPlayerBelongToUserService } from '../doesPlayerBelongToUser/DoesPlayerBelongToUserService';

export enum GetCitiesErrorResponses {
  InvalidQuery = 'Invalid query',
}

/**
 * Controller for the get cities operation.
 *
 * @export
 * @class GetCitiesController
 * @extends {BaseServices}
 */
export class GetCitiesController {
  private getCitiesService: GetCitiesService;
  private doesPlayerBelongToUserService: DoesPlayerBelongToUserService;
  private cityMapper: CityMapper;
  private userMapper: UserMapper;

  /**
   * Creates an instance of GetCitiesController.
   *
   * @param {GetCitiesService} getCitiesService
   * @memberof PlayerServices
   */
  constructor(
      getCitiesService: GetCitiesService,
      doesPlayerBelongToUserService: DoesPlayerBelongToUserService
  ) {
    this.getCitiesService = getCitiesService;
    this.doesPlayerBelongToUserService = doesPlayerBelongToUserService;
    this.cityMapper = new CityMapper();
    this.userMapper = new UserMapper();
  }

  /**
   * Get all the cities that match a query.
   *
   * @param {UserDTO} userDTO
   * @param {GetCitiesRequestDTO} incomingDTO
   * @return {Promise<GetCitiesResponseDTO | GetCitiesErrorResponseDTO>}
   * @memberof PlayerServices
   */
  async getCities(
      userDTO: UserDTO,
      incomingDTO: GetCitiesRequestDTO,
  ): Promise<GetCitiesResponseDTO | GetCitiesErrorResponseDTO> {
    try {
      const user: User = this.userMapper.fromDTO(userDTO);
      const player: Player = this.playerMapper.fromDTO(playerDTO);

      const cities: Array<City> = this.getCitiesService.getCities(player);

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
