import {RegisterUserRequestDTO} from './RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from './RegisterUserResponseDTO';
import {RegisterUserService} from './RegisterUserService';
import {log} from '../../../../shared/utils/log';
import {UserCredentials} from '../../domain/UserCredentials';
import {UserCredentialsMapper} from '../../mappers/UserCredentialsMapper';
import {JWTMapper} from '../../mappers/JWTMapper';
import {RegisterUserErrors} from './RegisterUserErrors';
import {UsernameErrors} from '../../domain/Username';
import {PasswordErrors} from '../../domain/Password';

/**
 *
 *
 * @export
 * @class RegisterUserController
 * @extends {BaseServices}
 */
export class RegisterUserController {
  private registerUserService: RegisterUserService;
  private userCredentialsMapper: UserCredentialsMapper;
  private jwtMapper: JWTMapper;

  /**
   * Creates an instance of RegisterUserController.
   *
   * @param {RegisterUserService} registerUserService
   * @memberof UserServices
   */
  constructor(registerUserService: RegisterUserService) {
    this.registerUserService = registerUserService;
    this.userCredentialsMapper = new UserCredentialsMapper();
    this.jwtMapper = new JWTMapper();
  }

  /**
   * This method accepts a `RegisterUserRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {RegisterUserRequestDTO} incomingDTO
   * @return {Promise<RegisterUserResponseDTO>}
   * @memberof UserServices
   */
  async registerUser(incomingDTO: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO> {
    try {
      // get domain objects from dtos
      const credentials = this.userCredentialsMapper.fromDTO(incomingDTO.$credentials);
      // call services with domain objects
      const jwt = await this.registerUserService.registerUser(credentials);
      // map domain responses to dtos
      const jwtDto = this.jwtMapper.toDTO(jwt);
      return new RegisterUserResponseDTO(
          credentials.$username.$value,
          jwtDto,
      );
    } catch (err) {
      switch (err.message) {
        case UsernameErrors.InvalidUsername:
          throw new Error(RegisterUserErrors.InvalidUsername);
        case PasswordErrors.InvalidPassword:
          throw new Error(RegisterUserErrors.InvalidPassword);
        case RegisterUserErrors.UsernameTaken:
          throw err;
        default:
          throw err;
      }
    }
  }
}
