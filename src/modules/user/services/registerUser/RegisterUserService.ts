import {IUserRepository} from '../../repos/IUserRepository';
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
export class RegisterUserService {
  private userRepository: IUserRepository;

  /**
   * Creates an instance of UserServices.
   *
   * @param {IUserRepository} userRepository
   * @memberof UserServices
   */
  constructor(userRepository: IUserRepository) {
    // set repos from construtor
    this.userRepository = userRepository;
  }

  /**
   * Service for handling registering a new user.
   *
   * @param {UserCredentials} credentials
   * @return {Promise<Response>}
   * @memberof UserServices
   */
  async registerUser(credentials: UserCredentials): Promise<JWT> {
    try {
      // hash password
      const hashedPassword = bcrypt.hashSync(credentials.getPasswordString(), 8);

      // save new user to database
      const newUser = await this.userRepository.createUser(
          credentials.getUsernameString(),
          hashedPassword,
      );

      return jwtMiddleware.createJWT(newUser);
    } catch (err) {
      // check the error type and return a relevant error
      if (err.message === 'Duplicate username error') {
        throw err;
      }
      throw new Error('Unexpected error');
    }
  }
}
