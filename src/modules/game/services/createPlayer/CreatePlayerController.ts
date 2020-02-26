import {UserDTO} from '../../../user/dtos/UserDTO';
import {CreatePlayerRequestDTO} from './CreatePlayerRequestDTO';
import {CreatePlayerResponseDTO} from './CreatePlayerResponseDTO';
import {CreatePlayerService} from './CreatePlayerService';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {UserMapper} from '../../../user/mappers/UserMapper';
import {log} from '../../../../shared/utils/log';

/**
 *
 *
 * @export
 * @class CreatePlayerController
 * @extends {BaseServices}
 */
export class CreatePlayerController {
  private createPlayerService: CreatePlayerService;
  private playerMapper: PlayerMapper;
  private userMapper: UserMapper;

  /**
   * Creates an instance of CreatePlayerController.
   *
   * @param {CreatePlayerService} createPlayerService
   * @memberof PlayerServices
   */
  constructor(createPlayerService: CreatePlayerService) {
    this.createPlayerService = createPlayerService;
    this.playerMapper = new PlayerMapper();
    this.userMapper = new UserMapper();
  }

  /**
   * This method accepts a `CreatePlayerRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {UserDTO} userDTO
   * @param {CreatePlayerRequestDTO} incomingDTO
   * @return {Promise<CreatePlayerResponseDTO>}
   * @memberof PlayerServices
   */
  async createPlayer(userDTO: UserDTO, incomingDTO: CreatePlayerRequestDTO): Promise<CreatePlayerResponseDTO> {
    // get player dto from incoming request
    const playerDTO = incomingDTO.$player;

    // get domain entities from dtos
    const player = this.playerMapper.fromDTO(playerDTO);
    const user = this.userMapper.fromDTO(userDTO);

    // coordinate servicesto create a new player in the world
    // 1. create player
    const newPlayer = await this.createPlayerService.createPlayer(
        user,
        player,
    );
    // 2. create new city for player
    // const city = await createCityService.creatCityForNewPlayer(
    //     newPlayer,
    // );
    // 3. give starting resources to player
    // const resources = await createResourcesService.createResourcesForNewPlayer(
    //     newPlayer,
    // );
    // 4. give starting army to player
    // const army = await createArmyService.createArmyForNewPlayer(
    //     newPlayer,
    //     city,
    // );

    // convert domain entities to dtos
    const newPlayerDTO = this.playerMapper.toDTO(newPlayer);

    // create response dto from results
    return new CreatePlayerResponseDTO(newPlayerDTO);
  }
}