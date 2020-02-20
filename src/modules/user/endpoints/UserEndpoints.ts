import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {RegisterUserRequestDTO} from '../services/registerUser/RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from '../services/registerUser/RegisterUserResponseDTO';
import {RegisterUserController} from '../services/registerUser/RegisterUserController';
import {LoginUserRequestDTO} from '../services/loginUser/LoginUserRequestDTO';
import {LoginUserResponseDTO} from '../services/loginUser/LoginUserResponseDTO';
import {LoginUserController} from '../services/loginUser/LoginUserController';
import {log} from '../../../shared/utils/log';

/**
 * UserEndpoints implements all of the endpoints for requests encapsulated
 * under user services. All `Endpoint` implementations must implement a handle
 * method which expects a generic `Request` object. This request object will be
 * delivered from `WorldServices` routing. Inside handle a
 */
export class UserEndpoints {
  private registerUserController: RegisterUserController;
  private loginUserController: LoginUserController;

  /**
   * Creates an instance of UserEndpoints.
   *
   * @param {RegisterUserController} registerUserController
   * @param {LoginUserController} loginUserController
   * @memberof UserEndpoints
   */
  constructor(registerUserController: RegisterUserController, loginUserController: LoginUserController) {
    // set properties for this specific service
    // this.serviceName = ServiceNames.User;
    this.registerUserController = registerUserController;
    this.loginUserController = loginUserController;
  }

  /**
   * Call the login user service...
   *
   * @param {MessageDTO} incomingMessage
   * @return {Promise<MessageDTO>}
   * @memberof UserEndpoints
   */
  async loginUser(incomingMessage: MessageDTO): Promise<MessageDTO> {
    // create DTO from incoming message's json data
    const requestDTO = LoginUserRequestDTO.fromJSON(
        incomingMessage.getData(),
    );

    // call registerUser service and get response DTO
    const responseDTO = await this.loginUserController.loginUser(
        requestDTO,
    );

    // create response from DTO
    return new MessageDTO(
        ServiceNames.User,
        ServiceOperations.LoginUser,
        responseDTO.toJSON(),
    );
  }

  /**
   * Call the register user service...
   *
   * @param {MessageDTO} incomingMessage
   * @return {Promise<MessageDTO>}
   * @memberof UserEndpoints
   */
  async registerUser(incomingMessage: MessageDTO): Promise<MessageDTO> {
    // create DTO from incoming message's json data
    const requestDTO = RegisterUserRequestDTO.fromJSON(
        incomingMessage.getData(),
    );

    // call registerUser service and get response DTO
    const responseDTO = await this.registerUserController.registerUser(
        requestDTO,
    );

    // create response from DTO
    return new MessageDTO(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        responseDTO.toJSON(),
    );
  }
}
