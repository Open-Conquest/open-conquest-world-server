import {CreatePlayerRequestDTO} from './CreatePlayerRequestDTO';
import {CreatePlayerResponseDTO} from './CreatePlayerResponseDTO';
import {CreatePlayerService} from './CreatePlayerService';
import {PlayerMapper} from '../../mappers/PlayerMapper';
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

  /**
   * Creates an instance of CreatePlayerController.
   *
   * @param {CreatePlayerService} createPlayerService
   * @memberof PlayerServices
   */
  constructor(createPlayerService: CreatePlayerService) {
    this.createPlayerService = createPlayerService;
  }

  /**
   * This method accepts a `CreatePlayerRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {CreatePlayerRequestDTO} incomingDTO
   * @return {Promise<CreatePlayerResponseDTO>}
   * @memberof PlayerServices
   */
  async createPlayer(incomingDTO: CreatePlayerRequestDTO): Promise<CreatePlayerResponseDTO> {
    // get player dto from incoming request
    const playerDTO = incomingDTO.player;
    // get player entity from dto
    const player = this.playerMapper.fromDTO(playerDTO);
    // call services
    const result = await this.createPlayerService.createPlayer(player);
    // create response dto from results
    return new CreatePlayerResponseDTO(
        null,
        null,
    );
  }
}
