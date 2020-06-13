import {IUserRepository} from '../../repos/IUserRepository';
import {UserCredentials} from '../../domain/UserCredentials';
import {User} from '../../domain/User';
import {JWT} from '../../domain/JWT';
import {jwtMiddleware} from '../../../../shared/middleware';
import * as bcrypt from 'bcryptjs';
import {UserFactory} from '../../factories/UserFactory';
import {RegisterUserErrors} from './RegisterUserErrors';
import {UserRepositoryErrors} from '../../repos/UserRepositoryErrors';

/**
 * RegisterUserService.
 */
export class RegisterUserService {
  private userRepository: IUserRepository;
  private userFactory: UserFactory;

  /**
   * Creates an instance of UserServices.
   * @param {IUserRepository} userRepository
   * @memberof UserServices
   */
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.userFactory = new UserFactory();
  }

  /**
   * Service for handling registering a new user.
   * @param {UserCredentials} credentials
   * @return {Promise<Response>}
   */
  async registerUser(credentials: UserCredentials): Promise<JWT> {
    try {
      // hash password
      const hashedPassword = bcrypt.hashSync(
          credentials.getPasswordString(),
          8,
      );
      // create new user entity with hashed password and username
      const user: User = this.userFactory.createUserWithHashedPassword(
          null,
          credentials.$username.$value,
          hashedPassword,
      );
      // persist new user entity with hashed password
      const newUser: User = await this.userRepository.createUser(user);
      // create jwt for the new user and return
      return jwtMiddleware.createJWT(newUser);
    } catch (err) {
      if (err.message === UserRepositoryErrors.DuplicateUsername) {
        throw new Error(RegisterUserErrors.UsernameTaken);
      }
      throw err;
    }
  }
}
