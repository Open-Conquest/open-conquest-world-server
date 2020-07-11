import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
/**
 * Endpoints template
 *
 * @export
 * @class TempEndpoints
 */
export class TempEndpoints extends BaseEndpoints {
  // insert-controllers here

  /**
   * Creates an instance of Endpoints.
   * @memberof TempEndpoints
   */
  constructor(
      // insert-controllers-parameters
  ) {
    super();
    // set-service-name
    // register-handlers
    // set-controllers-from-constructor
  }

  /**
   * Endpoint implementation for createPlayer.
   *
   * @param {MessageDTO} message
   * @return {Promise<MessageDTO>}
   * @memberof TempEndpoints
   */
  async createPlayer(message: MessageDTO): Promise<MessageDTO> {
    try {
      // get the authenticated acting user from message
      const userDTO = message.$user;

      // assemble dto from incoming request
      // insert-parse-request-dto
      const createPlayerDTO = CreatePlayerRequestDTO.fromJSON(
          message.$data,
      );

      // get response dto from operation controllerg
      const responseDTO = await this.createPlayerController.createPlayer(
          userDTO,
          createPlayerDTO,
      );

      // format response
      const response = new MessageDTO(
          // insert-endpoint-service-name
          ServiceNames.Player,
          // insert-operation-name
          ServiceOperations.CreatePlayer,
          null,
          null,
          responseDTO,
      );

      return response;
    } catch (err) {
      // insert-create-error-dto
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