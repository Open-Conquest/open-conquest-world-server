import {LoginUserRequestDTO} from './LoginUserRequestDTO';
import {LoginUserResponseDTO} from './LoginUserResponseDTO';
import {LoginUserService} from './LoginUserService';
import {log} from '../../../../shared/utils/log';
import {UserCredentials} from '../../domain/UserCredentials';
import {UserCredentialsMapper} from '../../mappers/UserCredentialsMapper';
import {JWTMapper} from '../../mappers/JWTMapper';
import {LoginUserErrors} from './LoginUserErrors';
import {LoginUserResponseErrorDTO} from './LoginUserReponseErrorDTO';

/**
 *
 *
 * @export
 * @class LoginUserController
 * @extends {BaseServices}
 */
export class LoginUserController {
  private loginUserService: LoginUserService;
  private userCredentialsMapper: UserCredentialsMapper;
  private jwtMapper: JWTMapper;

  /**
   * Creates an instance of LoginUserController.
   *
   * @param {LoginUserService} loginUserService
   * @memberof UserServices
   */
  constructor(loginUserService: LoginUserService) {
    this.loginUserService = loginUserService;
    this.userCredentialsMapper = new UserCredentialsMapper();
    this.jwtMapper = new JWTMapper();
  }

  /**
   * This method accepts a `LoginUserRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {LoginUserRequestDTO} incomingDTO
   * @return {Promise<LoginUserResponseDTO>}
   * @memberof UserServices
   */
  async loginUser(incomingDTO: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    try {
      // get domain objects from dtos
      const credentials = this.userCredentialsMapper.fromDTO(incomingDTO.credentials);

      // call services with domain objects
      const jwt = await this.loginUserService.loginUser(credentials);

      // map domain responses to dtos
      const jwtDto = this.jwtMapper.toDTO(jwt);
      return new LoginUserResponseDTO(
          credentials.getUsernameString(),
          jwtDto,
      );
    } catch (err) {
      switch (err.message) {
        case LoginUserErrors.InvalidCredentials: {
          throw err;
        }
        default: {
          throw new Error('Unkown error');
        }
      }
    }
  }
}
