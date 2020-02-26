import {RegisterUserRequestDTO} from './RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from './RegisterUserResponseDTO';
import {RegisterUserService} from './RegisterUserService';
import {log} from '../../../../shared/utils/log';
import { UserCredentials } from '../../domain/UserCredentials';
import { UserCredentialsMapper } from '../../mappers/UserCredentialsMapper';
import { JWTMapper } from '../../mappers/JWTMapper';

/**
 *
 *
 * @export
 * @class RegisterUserController
 * @extends {BaseServices}
 */
export class RegisterUserController {
  private _registerUserService: RegisterUserService;
  private _userCredentialsMapper: UserCredentialsMapper;
  private _jwtMapper: JWTMapper;

  /**
   * Creates an instance of RegisterUserController.
   *
   * @param {RegisterUserService} registerUserService
   * @memberof UserServices
   */
  constructor(registerUserService: RegisterUserService) {
    this._registerUserService = registerUserService;
    this._userCredentialsMapper = new UserCredentialsMapper();
    this._jwtMapper = new JWTMapper();
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
    // get domain objects from dtos
    const credentials = this._userCredentialsMapper.fromDTO(incomingDTO.credentials);

    // call services with domain objects
    const jwt = await this._registerUserService.registerUser(credentials);

    // map domain responses to dtos
    const jwtDto = this._jwtMapper.toDTO(jwt);
    return new RegisterUserResponseDTO(
        credentials.getUsernameString(),
        jwtDto,
    );
  }
}
