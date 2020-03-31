/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import {log} from '../../../shared/utils/log';
import {CreateMarchController, CreateMarchErrorResponses} from '../services/createMarch/CreateMarchController';
import {CreateMarchRequestDTO} from '../services/createMarch/CreateMarchRequestDTO';
import {CreateMarchErrorResponseDTO} from '../services/createMarch/CreateMarchErrorResponseDTO';
import {CreateMarchErrors} from '../services/createMarch/CreateMarchErrors';

/**
 * MarchEndpoints implements all of the endpoints responsible for handling
 * the operations housed under the Player service.
 *
 * @export
 * @class MarchEndpoints
 */
export class MarchEndpoints extends BaseEndpoints {
  private createMarchController: CreateMarchController;

  /**
   * Creates an instance of MarchEndpoints.
   * @param {CreatePlayerController} createMarchController
   * @memberof MarchEndpoints
   */
  constructor(createMarchController: CreateMarchController) {
    super();
    this.serviceName = ServiceNames.March;
    this.handlers[ServiceOperations.CreateMarch] = this.createMarch.bind(this);
    this.createMarchController = createMarchController;
  }

  /**
   * Endpoint implementation for createMarch.
   *
   * @param {MessageDTO} message
   * @return {Promise<MessageDTO>}
   * @memberof MarchEndpoints
   */
  async createMarch(message: MessageDTO): Promise<MessageDTO> {
    try {
      // get the authenticated acting user from message
      const userDTO = message.$user;

      // assemble CreateMarchRequestDTO from incoming message
      const createMarchDTO = CreateMarchRequestDTO.fromJSON(
          message.$data,
      );

      // get CreateMarchResponseDTO from createMarchController
      const responseDTO = await this.createMarchController.createMarch(
          userDTO,
          createMarchDTO,
      );

      return new MessageDTO(
          ServiceNames.March,
          ServiceOperations.CreateMarch,
          null,
          null,
          responseDTO,
      );
    } catch (err) {
      // create a new error dto to include in message
      const errorDTO = new CreateMarchErrorResponseDTO(null);

      // change the error message depending on the internal error
      switch (err.message) {
        case CreateMarchErrorResponses.InsufficientUnits:
          errorDTO.$message = CreateMarchErrors.InsufficientUnits;
          break;
        case CreateMarchErrorResponses.UnauthorizedUser:
          errorDTO.$message = CreateMarchErrorResponses.UnauthorizedUser;
          break;
        case CreateMarchErrorResponses.NonexistentTile:
          errorDTO.$message = CreateMarchErrorResponses.NonexistentTile;
          break;
        case CreateMarchErrorResponses.NonexistentPlayer:
          errorDTO.$message = CreateMarchErrorResponses.NonexistentPlayer;
          break;
        default:
          errorDTO.$message = 'Unknown internal error';
      }

      // return a new message indicating an error creating player
      return new MessageDTO(
          ServiceNames.March,
          ServiceOperations.CreateMarchError,
          null,
          null,
          errorDTO.toJSON(),
      );
    }
  }
}
