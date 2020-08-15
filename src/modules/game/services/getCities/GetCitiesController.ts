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
import { GetCitiesRequestDTO } from './GetCitiesRequestDTO';
import { UserMapper } from '../../../user/mappers/UserMapper';
import { DoesPlayerBelongToUserService } from '../doesPlayerBelongToUser/DoesPlayerBelongToUserService';
import { doesPlayerBelongToUserService } from '../doesPlayerBelongToUser';
import { GetCitiesErrors } from './GetCitiesErrors';

export enum GetCitiesErrorResponses {
  UnauthorizedUser = 'Player does not belong to user',
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
  private playerMapper: PlayerMapper;
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
    this.playerMapper = new PlayerMapper();
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
      const player: Player = this.playerMapper.fromDTO(incomingDTO.$player);

      const authorized = await this.doesPlayerBelongToUserService.check(user, player);
      
      if (!authorized) throw new Error(GetCitiesErrors.UnauthorizedUser);

      const cities: Array<City> = await this.getCitiesService.getCities(player);

      const cityDTOs = []
      for (let i = 0; i < cities.length; i++) {
        cityDTOs.push(this.cityMapper.toDTO(cities[i]));
      }

      return new GetCitiesResponseDTO(cityDTOs);
    } catch (err) {
      switch (err.message) {
        case GetCitiesErrors.UnauthorizedUser:
          throw err;
        default:
          log.error('Unknown error in GetCitiesController', err.stack);
          throw new Error(GetCitiesErrors.UnknownError);
      }
    }
  }
}
