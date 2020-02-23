import {IUserRepository} from '../../repos/IUserRepository';
import {UserCredentials} from '../../domain/UserCredentials';
import {User} from '../../domain/User';
import {JWT} from '../../domain/JWT';
import {jwtMiddleware} from '../../../../shared/middleware';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as config from '../../../../shared/config/real-config';
import {log} from '../../../../shared/utils/log';
import { UserFactory } from '../../factories/UserFactory';

/**
 *
 *
 * @export
 * @class UserServices
 */
export class RegisterUserService {
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
   * Service for handling registering a new user.
   *
   * @param {UserCredentials} credentials
   * @return {Promise<Response>}
   * @memberof UserServices
   */
  async registerUser(credentials: UserCredentials): Promise<JWT> {
    // try to register a new user
    try {
      // hash password
      const hashedPassword = bcrypt.hashSync(
          credentials.getPasswordString(),
          8,
      );
      // create new user entity
      const user = this.userFactory.createUserWithHashedPassword(
          null,
          credentials.getUsernameString(),
          hashedPassword,
      );
      // save new user to database
      const newUser = await this.userRepository.createUser(user);
      // create jwt for new user and return
      return jwtMiddleware.createJWT(newUser);

    // check for any errors
    } catch (err) {
      if (err.message === 'Duplicate username error') {
        throw err;
      }
      throw new Error('Unexpected error');
    }
  }
}
