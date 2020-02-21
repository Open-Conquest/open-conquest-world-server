import {LoginPlayerRequestDTO} from './LoginPlayerRequestDTO';
import {LoginPlayerResponseDTO} from './LoginPlayerResponseDTO';
import {LoginPlayerService} from './LoginPlayerService';
import {log} from '../../../../shared/utils/log';
import { PlayerCredentials } from '../../domain/PlayerCredentials';
import { PlayerCredentialsMapper } from '../../mappers/PlayerCredentialsMapper';
import { JWTMapper } from '../../mappers/JWTMapper';

/**
 *
 *
 * @export
 * @class LoginPlayerController
 * @extends {BaseServices}
 */
export class LoginPlayerController {
  private loginPlayerService: LoginPlayerService;
  private playerCredentialsMapper: PlayerCredentialsMapper;
  private jwtMapper: JWTMapper;

  /**
   * Creates an instance of LoginPlayerController.
   *
   * @param {LoginPlayerService} loginPlayerService
   * @memberof PlayerServices
   */
  constructor(loginPlayerService: LoginPlayerService) {
    this.loginPlayerService = loginPlayerService;
    this.playerCredentialsMapper = new PlayerCredentialsMapper();
    this.jwtMapper = new JWTMapper();
  }

  /**
   * This method accepts a `LoginPlayerRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {LoginPlayerRequestDTO} incomingDTO
   * @return {Promise<LoginPlayerResponseDTO>}
   * @memberof PlayerServices
   */
  async loginPlayer(incomingDTO: LoginPlayerRequestDTO): Promise<LoginPlayerResponseDTO> {
    // get domain objects from dtos
    const credentials = this.playerCredentialsMapper.fromDTO(incomingDTO.credentials);

    // call services with domain objects
    const jwt = await this.loginPlayerService.loginPlayer(credentials);

    // map domain responses to dtos
    const jwtDto = this.jwtMapper.toDTO(jwt);
    return new LoginPlayerResponseDTO(
        credentials.getPlayernameString(),
        jwtDto,
    );
  }
}