import * as jwt from 'jsonwebtoken';
import * as config from '../config/real-config';
import {UserFactory} from '../../modules/user/factories/UserFactory';
import {User} from '../../modules/user/domain/User';
import {JWT} from '../../modules/user/domain/JWT';
import {UserDTO} from '../../modules/user/dtos/UserDTO';
import {MessageDTO} from '../dtos/MessageDTO';
import {JWTDTO} from '../dtos/JWTDTO';
import {log} from '../utils/log';

export enum JWTMiddlewareErrors {
  InvalidJWT = 'Access denied, invalid authorization token.',
  InvalidSignature = 'Token was signed with by an invalid authority',
  UnknownError = 'Unknown error in JWTMiddleware',
  NoToken = 'No token was provided',
  NoUserProvided = 'No user was provided',
}

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
    if (token === null) {
      throw new Error(JWTMiddlewareErrors.InvalidJWT);
    }

    try {
      // check if token is valid
      const payload = jwt.verify(token.getTokenString(), config.secret);
      // construct user from jwt claims
      return this.userFactory.createUserWithUsernameAndID(
          payload.user_id,
          payload.username,
      );
    } catch (err) {
      switch (err.message) {
        case 'jwt must be provided':
          throw new Error(JWTMiddlewareErrors.InvalidJWT);
        case 'jwt malformed':
          throw new Error(JWTMiddlewareErrors.InvalidJWT);
        case 'invalid signature':
          throw new Error(JWTMiddlewareErrors.InvalidSignature);
      }
      throw err;
    }
  }

  /**
   * Check to see if the token provided in the message is valid. If the token
   * is valid change the user in the message to reflect the user included
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
      if (token == null) {
        throw new Error(JWTMiddlewareErrors.NoToken);
      }

      // validate jwt and get user from claims
      const jwt: JWT = new JWT(token.value);
      const user: User = this.validateJwt(jwt);

      // create userDTO from validated claims
      const userDTO = new UserDTO(
          user.$id.$value,
          user.$username.$value,
      );
      // set acting user property in message & return message
      message.$user = userDTO;
      return message;

      // catch any errors
    } catch (err) {
      switch (err.message) {
        case JWTMiddlewareErrors.InvalidJWT:
          throw err;
        case JWTMiddlewareErrors.InvalidSignature:
          throw err;
        case JWTMiddlewareErrors.UnknownError:
          throw err;
        case JWTMiddlewareErrors.NoToken:
          throw err;
        default:
          throw new Error(JWTMiddlewareErrors.UnknownError);
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
    if (user == null) {
      throw new Error(JWTMiddlewareErrors.NoUserProvided);
    }

    // generate jwt for newly registered user
    const token = jwt.sign(
        {
          username: user.$username.$value,
          user_id: user.$id.$value,
        },
        config.secret,
        {
          expiresIn: '1h',
        },
    );
    return new JWT(token);
  }
}
