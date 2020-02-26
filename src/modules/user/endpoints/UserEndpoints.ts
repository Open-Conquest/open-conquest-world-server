import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
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
export class UserEndpoints extends BaseEndpoints {
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
    super();
    this.serviceName = ServiceNames.User;
    this.handlers[ServiceOperations.RegisterUser] = this.registerUser.bind(this);
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
        incomingMessage.$data,
    );

    // call registerUser service and get response DTO
    const responseDTO = await this.loginUserController.loginUser(
        requestDTO,
    );

    // create response from DTO
    const response = new MessageDTO(null, null, null, null, null);
    response.$service = ServiceNames.User;
    response.$operation = ServiceOperations.LoginUser;
    response.$data = responseDTO.toJSON();
    return response;
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
        incomingMessage.$data,
    );

    // call registerUser service and get response DTO
    const responseDTO = await this.registerUserController.registerUser(
        requestDTO,
    );

    // create response from DTO
    const response = new MessageDTO(null, null, null, null, null);
    response.$service = ServiceNames.User;
    response.$operation = ServiceOperations.RegisterUser;
    response.$data = responseDTO.toJSON();
    return response;
  }
}
