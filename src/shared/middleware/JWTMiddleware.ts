import * as jwt from 'jsonwebtoken';
import * as config from '../config/real-config';
import {UserFactory} from '../../modules/user/factories/UserFactory';
import {User} from '../../modules/user/domain/User';
import {JWT} from '../../modules/user/domain/JWT';
import {UserDTO} from '../../modules/user/dtos/UserDTO';
import {MessageDTO} from '../dtos/MessageDTO';
import {JWTDTO} from '../dtos/JWTDTO';
import {log} from '../utils/log';

/**
 * Middleware for validating incoming JWTs.
 *
 * @export
 * @class JWTMiddleware
 */
export class JWTMiddleware {
  private userFactory: UserFactory;

  /**
   * Creates an instance of JWTMiddleware.
   *
   * @memberof JWTMiddleware
   */
  constructor() {
    this.userFactory = new UserFactory();
  }

  /**
   * Check to see whether a JWT is valid, signed by an authorized server.
   * And return the user from the claim.
   *
   * @param {JWT} token
   * @return {User} user from jwt claims
   * @memberof JWTMiddleware
   */
  validateJwt(token: JWT): User {
    try {
      // check if token is valid
      const payload = jwt.verify(token.getTokenString(), config.secret);
      log.info(payload);
      // get username from payload
      const username = payload.username;
      // instantiate user with username
      return this.userFactory.createUserWithUsername(username);
    } catch (err) {
      if (err.message === 'jwt malformed') {
        throw new Error('Access denied, invalid authorization token.');
      } else {
        log.error(err);
        throw new Error('Unexpected error');
      }
    }
  }

  /**
   * Check to see if the token provided in the message is valid. If the token
   * is valid change the userID in the message to reflect the user included
   * in the token's claims.
   *
   * @param {MessageDTO} message
   * @return {MessageDTO}
   * @memberof JWTMiddleware
   */
  validateMessage(message: MessageDTO): MessageDTO {
    // try to validate jwt and get user from claims
    try {
      // get token from message
      const token = message.$token;
      if (token === null) {
        throw new Error('No token provided');
      }
      const jwt = new JWT(token.$value);

      // validate jwt and get user from claims
      const user = this.validateJwt(jwt);

      // create userDTO from validated claims
      const userDTO = new UserDTO();
      userDTO.$userID = user.getId().getValue();
      userDTO.$username = user.getUsername().getString();

      // set acting user property in message
      message.$user = userDTO;
      return message;

      // catch any errors
    } catch (err) {
      if (err.message === 'No token provided' ||
          err.message === 'jwt malfored' ||
          err.message === 'Access denied, invalid authorization token.') {
        throw new Error('Invalid token');
      } else {
        throw new Error('Unexpected error');
      }
    }
  }

  /**
   * Create a new JWT for user.
   *
   * @param {User} user
   * @return {JWT}
   * @memberof JWTMiddleware
   */
  createJWT(user: User): JWT {
    // generate jwt for newly registered user
    const token = jwt.sign(
        {username: user.getUsernameString()},
        config.secret,
        {expiresIn: '1h'},
    );

    // should return a user with a username & token
    return new JWT(
        token,
    );
  }
}
