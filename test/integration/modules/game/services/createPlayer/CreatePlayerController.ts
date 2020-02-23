import { CreatePlayerService } from 'src/modules/game/services/createPlayer/CreatePlayerService';
import { CreatePlayerResponseDTO } from 'src/modules/game/services/createPlayer/CreatePlayerResponseDTO';
import { CreatePlayerRequestDTO } from 'src/modules/game/services/createPlayer/CreatePlayerRequestDTO';

/**
 *
 *
 * @export
 * @class CreatePlayerController
 */
export class CreatePlayerController {
  private createPlayerService: CreatePlayerService;

  /**
   * Creates an instance of CreatePlayerController.
   *
   * @param {CreatePlayerService} createPlayerService
   * @memberof CreatePlayerController
   */
  constructor(createPlayerService: CreatePlayerService) {
    this.createPlayerService = createPlayerService;
  }

  /**
   * Accepts a CreatePlayerRequestDTO
   *
   * @param {CreatePlayerRequestDTO} request
   * @returns {CreatePlayerResponseDTO}
   * @memberof CreatePlayerController
   */
  createPlayer(request: CreatePlayerRequestDTO): CreatePlayerResponseDTO {
    // map dto to domain
    // call services
    // return dto
  }
}
