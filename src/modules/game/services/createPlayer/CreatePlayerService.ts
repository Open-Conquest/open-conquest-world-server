import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {PlayerFactory} from '../../factories/PlayerFactory';
import {PlayerCredentials} from '../../domain/PlayerCredentials';
import {Player} from '../../domain/Player';
import {JWT} from '../../domain/JWT';
import {jwtMiddleware} from '../../../../shared/middleware';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as config from '../../../../shared/config/real-config';
import {log} from '../../../../shared/log';

/**
 *
 *
 * @export
 * @class PlayerServices
 */
export class LoginPlayerService {
  private playerRepository: IPlayerRepository;
  private playerFactory: PlayerFactory;

  /**
   * Creates an instance of PlayerServices.
   *
   * @param {IPlayerRepository} playerRepository
   * @memberof PlayerServices
   */
  constructor(playerRepository: IPlayerRepository) {
    // set repos from construtor
    this.playerRepository = playerRepository;
    this.playerFactory = new PlayerFactory();
  }

  /**
   * Service for handling logining a new player.
   *
   * @param {PlayerCredentials} credentials
   * @return {Promise<Response>}
   * @memberof PlayerServices
   */
  async loginPlayer(credentials: PlayerCredentials): Promise<JWT> {
    try {
      // get player from database, compare hashed password
      const hashedPassword = await this.playerRepository.getPlayerPasswordWithPlayername(
          credentials.getPlayernameString(),
      );

      // return jwt if player has valid credentials
      if (bcrypt.compareSync(credentials.getPasswordString(), hashedPassword.getString())) {
        // create a player domain entity
        const loggedInPlayer = this.playerFactory.createPlayerWithPlayername(
            credentials.getPlayernameString(),
        );
        // create a jwt for this player and return
        return jwtMiddleware.createJWT(loggedInPlayer);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      throw new Error('Invalid login');
    }
  }
}
