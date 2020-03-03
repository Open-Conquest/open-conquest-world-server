/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
import {CreatePlayerController} from '../services/createPlayer/CreatePlayerController';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {CreatePlayerResponseDTO} from '../services/createPlayer/CreatePlayerResponseDTO';
import {CreatePlayerRequestDTO} from '../services/createPlayer/CreatePlayerRequestDTO';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import {log} from '../../../shared/utils/log';
import { CreatePlayerErrors } from '../services/createPlayer/CreatePlayerErrors';
import { CreatePlayerErrorResponseDTO } from '../services/createPlayer/CreatePlayerErrorResponseDTO';

/**
 * PlayerEndpoints implements all of the endpoints responsible for handling
 * the operations housed under the Player service.
 *
 * @export
 * @class PlayerEndpoints
 */
export class PlayerEndpoints extends BaseEndpoints {
  private createPlayerController: CreatePlayerController;

  /**
   * Creates an instance of PlayerEndpoints.
   * @param {CreatePlayerController} createPlayerController
   * @memberof PlayerEndpoints
   */
  constructor(createPlayerController: CreatePlayerController) {
    super();
    this.serviceName = ServiceNames.Player;
    this.handlers[ServiceOperations.CreatePlayer] = this.createPlayer.bind(this);
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
    try {
      // get the acting user from message
      const userDTO = message.$user;

      // assemble CreatePlayerRequestDTO from incoming message
      const createPlayerDTO = CreatePlayerRequestDTO.fromJSON(
          message.$data,
      );

      // TODO: maybe some error handling around this failing?
      const responseDTO = await this.createPlayerController.createPlayer(
          userDTO,
          createPlayerDTO,
      );

      const response = new MessageDTO(
          ServiceNames.Player,
          ServiceOperations.CreatePlayer,
          null,
          null,
          responseDTO,
      );

      return response;
    } catch (err) {
      // create a new error dto to include in message
      const errorDTO = new CreatePlayerErrorResponseDTO(null);

      // change the error message depending on the internal error
      switch (err.message) {
        case CreatePlayerErrors.DuplicatePlayername:
          errorDTO.$message = CreatePlayerErrors.DuplicatePlayername;
          break;
        default:
          errorDTO.$message = CreatePlayerErrors.UnknownError;
      }

      // return a new message indicating an error creating player
      return new MessageDTO(
          ServiceNames.Player,
          ServiceOperations.CreatePlayerError,
          null,
          null,
          errorDTO.toJSON(),
      );
    }
  }
}
