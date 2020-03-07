import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {RegisterUserRequestDTO} from '../services/registerUser/RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from '../services/registerUser/RegisterUserResponseDTO';
import {RegisterUserController} from '../services/registerUser/RegisterUserController';
import {LoginUserRequestDTO} from '../services/loginUser/LoginUserRequestDTO';
import {LoginUserResponseDTO} from '../services/loginUser/LoginUserResponseDTO';
import {LoginUserResponseErrorDTO} from '../services/loginUser/LoginUserReponseErrorDTO';
import {RegisterUserErrorResponseDTO} from '../services/registerUser/RegisterUserErrorResponseDTO';
import {LoginUserController} from '../services/loginUser/LoginUserController';
import {LoginUserErrors} from '../services/loginUser/LoginUserErrors';
import {RegisterUserErrors} from '../services/registerUser/RegisterUserErrors';
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
    this.handlers[ServiceOperations.LoginUser] = this.loginUser.bind(this);
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
    try {
      // create DTO from incoming message's json data
      const requestDTO = LoginUserRequestDTO.fromJSON(
          incomingMessage.$data,
      );

      // call registerUser service and get response DTO
      const responseDTO = await this.loginUserController.loginUser(
          requestDTO,
      );

      // create response from DTO
      return new MessageDTO(
          ServiceNames.User,
          ServiceOperations.LoginUser,
          null,
          null,
          responseDTO.toJSON(),
      );
    } catch (err) {
      const errorDTO = new LoginUserResponseErrorDTO(null);
      switch (err.message) {
        case LoginUserErrors.InvalidCredentials: {
          errorDTO.$message = 'Invalid username / password combination';
          break;
        }
        default: {
          log.error('Unknown error', err.stack);
          errorDTO.$message = 'Unkown error, fuck';
          break;
        }
      }

      return new MessageDTO(
          ServiceNames.User,
          ServiceOperations.LoginUserError,
          null,
          null,
          errorDTO.toJSON(),
      );
    }
  }

  /**
   * Call the register user service...
   *
   * @param {MessageDTO} incomingMessage
   * @return {Promise<MessageDTO>}
   * @memberof UserEndpoints
   */
  async registerUser(incomingMessage: MessageDTO): Promise<MessageDTO> {
    try {
      // create DTO from incoming message's json data
      const requestDTO = RegisterUserRequestDTO.fromJSON(
          incomingMessage.$data,
      );

      // call registerUser service and get response DTO
      const responseDTO = await this.registerUserController.registerUser(
          requestDTO,
      );

      // create general messageDTO from responseDTO
      return new MessageDTO(
          ServiceNames.User,
          ServiceOperations.RegisterUser,
          null,
          null,
          responseDTO.toJSON(),
      );
    } catch (err) {
      const errorDTO = new RegisterUserErrorResponseDTO(null);
      switch (err.message) {
        case RegisterUserErrors.BadUsername: {
          errorDTO.$message = 'Invalid username, must be between 4-20 characters';
          break;
        }
        case RegisterUserErrors.BadPassword: {
          errorDTO.$message = 'Invalid password, must be between 8-20 characters';
          break;
        }
        case RegisterUserErrors.UsernameTaken: {
          errorDTO.$message = 'Username is taken';
          break;
        }
        default: {
          log.error('Unknown error', err.stack);
          errorDTO.$message = 'Unknown error, fuck';
          break;
        }
      }

      return new MessageDTO(
          ServiceNames.User,
          ServiceOperations.RegisterUserError,
          null,
          null,
          errorDTO.toJSON(),
      );
    }
  }
}
