/* eslint-disable max-len */
import {CreatePlayerController} from '../services/createPlayer/CreatePlayerController';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {CreatePlayerResponseDTO} from '../services/createPlayer/CreatePlayerResponseDTO';
import {CreatePlayerRequestDTO} from '../services/createPlayer/CreatePlayerRequestDTO';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';

/**
 *
 *
 * @export
 * @class PlayerEndpoints
 */
export class PlayerEndpoints {
  private createPlayerController: CreatePlayerController;

  /**
   * Creates an instance of PlayerEndpoints.
   * @param {CreatePlayerController} createPlayerController
   * @memberof PlayerEndpoints
   */
  constructor(createPlayerController: CreatePlayerController) {
    this.createPlayerController = createPlayerController;
  }

  /**
   * Endpoint implementation for createPlayer.
   *
   * @param {MessageDTO} message
   * @return {Promise<MessageDTO>}
   * @memberof PlayerEndpoints
   */
  async createPlayer(message: MessageDTO): Promise<MessageDTO> {
    // get user from jwt

    // assemble CreatePlayerRequestDTO from MessageDTO
    const createPlayerDTO = CreatePlayerRequestDTO.fromJSON(
        message.getData(),
    );
    // call creatPlayerController with DTO
    const responseDTO = await this.createPlayerController.createPlayer(
        createPlayerDTO,
    );
    // get CreatePlayerResponseDTO & map to generic MessageDTO
    return new MessageDTO(
        ServiceNames.Player,
        ServiceOperations.CreatePlayer,
        responseDTO.toJSON(),
    );
  }
}
