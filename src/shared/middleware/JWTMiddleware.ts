import * as jwt from 'jsonwebtoken';
import * as config from '../config/real-config';
import {UserFactory} from '../../modules/user/factories/UserFactory';
import {User} from '../../modules/user/domain/User';
import {JWT} from '../../modules/user/domain/JWT';
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
      log.error(err);
      throw new Error('Access denied, invalid authorization token.');
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
