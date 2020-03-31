import {CreateMarchRequestDTO} from './CreateMarchRequestDTO';
import {UserDTO} from '../../../user/dtos/UserDTO';
import {CreateMarchService} from './CreateMarchService';
import {MarchMapper} from '../../mappers/MarchMapper';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {CreateMarchResponseDTO} from './CreateMarchResponseDTO';
import {CreateMarchErrorResponseDTO} from './CreateMarchErrorResponseDTO';
import {log} from '../../../../shared/utils/log';
import {UserMapper} from '../../../user/mappers/UserMapper';
import {DoesPlayerBelongToUserService} from '../doesPlayerBelongToUser/DoesPlayerBelongToUserService';
import {CreateMarchErrors} from './CreateMarchErrors';

export enum CreateMarchErrorResponses {
  UnauthorizedUser = 'User is not authorized to create march for player',
  InsufficientUnits = 'Player has insufficient units to create march',
  NonexistentPlayer = 'Tried to create march for player that does not exist',
  NonexistentTile = 'Tried to create march for nonexistent tile',
}

/**
 * Controller for createMarch request.
 * @export
 * @class CreateMarchController
 */
export class CreateMarchController {
  private doesPlayerBelongToUser: DoesPlayerBelongToUserService;
  private createMarchService: CreateMarchService;
  private marchMapper: MarchMapper;
  private playerMapper: PlayerMapper;
  private userMapper: UserMapper;

  /**
   * Creates an instance of CreateMarchController.
   * @param {CreateMarchService} createMarchService
   * @param {DoesPlayerBelongToUserService} doesPlayerBelongToUser
   */
  constructor(
      createMarchService: CreateMarchService,
      doesPlayerBelongToUser: DoesPlayerBelongToUserService,
  ) {
    this.createMarchService = createMarchService;
    this.doesPlayerBelongToUser = doesPlayerBelongToUser;
    this.marchMapper = new MarchMapper();
    this.playerMapper = new PlayerMapper();
    this.userMapper = new UserMapper();
  }

  /**
   * Handler for createMarch request.
   *
   * @param {UserDTO} userDTO
   * @param {CreateMarchRequestDTO} incomingDTO
   * @return {Promise<CreateMarchResponseDTO>}
   * @memberof CreateMarchController
   */
  async createMarch(
      userDTO: UserDTO, incomingDTO: CreateMarchRequestDTO,
  ): Promise<CreateMarchResponseDTO> {
    try {
      // check that player belongs to user
      const user = this.userMapper.fromDTO(userDTO);
      const player = this.playerMapper.fromDTO(incomingDTO.$player);
      const playerBelongsToUser = await this.doesPlayerBelongToUser.check(
          user, player,
      );
      if (!playerBelongsToUser) {
        throw new Error(CreateMarchErrorResponses.UnauthorizedUser);
      }
      // create march
      const march = this.marchMapper.fromDTO(incomingDTO.$march);
      const createdMarch = await this.createMarchService.createMarch(
          player, march,
      );
      const createdMarchDTO = this.marchMapper.toDTO(createdMarch);
      return new CreateMarchResponseDTO(createdMarchDTO);
    } catch (err) {
      switch (err.message) {
        case CreateMarchErrors.NonexistentPlayer:
          throw new Error(CreateMarchErrorResponses.NonexistentPlayer);
        case CreateMarchErrors.InsufficientUnits:
          throw new Error(CreateMarchErrorResponses.InsufficientUnits);
        case CreateMarchErrors.NonexistentTile:
          throw new Error(CreateMarchErrorResponses.NonexistentTile);
        case CreateMarchErrorResponses.UnauthorizedUser:
          throw err;
        default:
          throw err;
      }
    }
  }
}
