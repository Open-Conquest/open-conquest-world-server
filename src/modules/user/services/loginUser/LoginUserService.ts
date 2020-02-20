import {IUserRepository} from '../../repos/IUserRepository';
import {UserFactory} from '../../factories/UserFactory';
import {UserCredentials} from '../../domain/UserCredentials';
import {User} from '../../domain/User';
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
 * @class UserServices
 */
export class LoginUserService {
  private userRepository: IUserRepository;
  private userFactory: UserFactory;

  /**
   * Creates an instance of UserServices.
   *
   * @param {IUserRepository} userRepository
   * @memberof UserServices
   */
  constructor(userRepository: IUserRepository) {
    // set repos from construtor
    this.userRepository = userRepository;
    this.userFactory = new UserFactory();
  }

  /**
   * Service for handling logining a new user.
   *
   * @param {UserCredentials} credentials
   * @return {Promise<Response>}
   * @memberof UserServices
   */
  async loginUser(credentials: UserCredentials): Promise<JWT> {
    try {
      // get user from database, compare hashed password
      const hashedPassword = await this.userRepository.getUserPasswordWithUsername(
          credentials.getUsernameString(),
      );

      // return jwt if user has valid credentials
      if (bcrypt.compareSync(credentials.getPasswordString(), hashedPassword.getString())) {
        // create a user domain entity
        const loggedInUser = this.userFactory.createUserWithUsername(
            credentials.getUsernameString(),
        );
        // create a jwt for this user and return
        return jwtMiddleware.createJWT(loggedInUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      throw new Error('Invalid login');
    }
  }
}
