import {UserDTO} from '../../../user/dtos/UserDTO';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {UserMapper} from '../../../user/mappers/UserMapper';
import {log} from '../../../../shared/utils/log';
import {User} from '../../../user/domain/User';
import {GetPlayersService} from '../getPlayers/GetPlayersService';
import {GetMyPlayersResponseDTO} from './GetPlayersResponseDTO';
import {GetPlayersErrorResponseDTO} from './GetPlayersErrorResponseDTO';
import {GetPlayersErrors} from '../getPlayers/GetPlayersErrors';

/**
 *
 *
 * @export
 * @class CreatePlayerController
 * @extends {BaseServices}
 */
export class GetMyPlayersController {
  private getPlayersService: GetPlayersService;
  private playerMapper: PlayerMapper;
  private userMapper: UserMapper;

  /**
   * Creates an instance of CreatePlayerController.
   *
   * @param {GetPlayersService} getPlayersService
   * @memberof PlayerServices
   */
  constructor(getPlayersService: GetPlayersService) {
    this.getPlayersService = getPlayersService;
    this.playerMapper = new PlayerMapper();
    this.userMapper = new UserMapper();
  }

  /**
   * This method accepts a `CreatePlayerRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {UserDTO} userDTO
   * @return {Promise<GetMyPlayersResponseDTO | GetMyPlayersErrorResponseDTO>}
   * @memberof PlayerServices
   */
  async getPlayers(
      userDTO: UserDTO,
  ): Promise<GetMyPlayersResponseDTO | GetPlayersErrorResponseDTO> {
    try {
      // get user and player from DTOs
      const user: User = this.userMapper.fromDTO(userDTO);
      // create player in database with army
      const usersPlayers = await this.getPlayersService.getPlayers(user);
      // convert domain entities to dtos
      const usersPlayersDTOs = [];
      for (let i = 0; i < usersPlayers.length; i++) {
        usersPlayersDTOs.push(this.playerMapper.toDTO(usersPlayers[i]));
      }
      // create response dto from results
      return new GetMyPlayersResponseDTO(usersPlayersDTOs);
    } catch (err) {
      // check error message and throw appropriate error for caller to handle
      switch (err.message) {
        case GetPlayersErrors.NonexistentUser:
          throw err;
        default:
          log.error('Unknown error in CreatePlayerController', err.stack);
          throw new Error(GetPlayersErrors.UnknownError);
      }
    }
  }
}
