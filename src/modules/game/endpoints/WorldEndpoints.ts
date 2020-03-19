/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
import {GetWorldController} from '../services/getWorld/GetWorldController';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {GetWorldResponseDTO} from '../services/getWorld/GetWorldResponseDTO';
import {GetWorldRequestDTO} from '../services/getWorld/GetWorldRequestDTO';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import {log} from '../../../shared/utils/log';
import {GetWorldErrors} from '../services/getWorld/GetWorldErrors';
import {GetWorldErrorResponseDTO} from '../services/getWorld/GetWorldErrorResponseDTO';

/**
 * PlayerEndpoints implements all of the endpoints responsible for handling
 * the operations housed under the Player service.
 *
 * @export
 * @class PlayerEndpoints
 */
export class WorldEndpoints extends BaseEndpoints {
  private getWorldController: GetWorldController;

  /**
   * Creates an instance of PlayerEndpoints.
   * @param {GetWorldController} getWorldController
   * @memberof PlayerEndpoints
   */
  constructor(getWorldController: GetWorldController) {
    super();
    this.serviceName = ServiceNames.World;
    this.handlers[ServiceOperations.GetWorld] = this.getWorld.bind(this);
    this.getWorldController = getWorldController;
  }

  /**
   * Endpoint implementation for getWorld.
   *
   * @param {MessageDTO} message
   * @return {Promise<MessageDTO>}
   * @memberof PlayerEndpoints
   */
  async getWorld(message: MessageDTO): Promise<MessageDTO> {
    try {
      const responseDTO = await this.getWorldController.getWorld();

      return new MessageDTO(
          ServiceNames.World,
          ServiceOperations.GetWorld,
          null,
          null,
          responseDTO,
      );
    } catch (err) {
      // create a new error dto to include in message
      const errorDTO = new GetWorldErrorResponseDTO(null);

      // change the error message depending on the internal error
      switch (err.message) {
        default:
          errorDTO.message = GetWorldErrors.UnknownError;
      }

      // return a new message indicating an error creating player
      return new MessageDTO(
          ServiceNames.World,
          ServiceOperations.GetWorldError,
          null,
          null,
          errorDTO.toJSON(),
      );
    }
  }
}
