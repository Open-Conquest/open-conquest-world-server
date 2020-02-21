import {IUserRepository} from '../IUserRepository';
import {User} from '../../domain/User';
import {UserMapper} from '../../mappers/UserMapper';
import { Password } from '../../domain/Password';
import { log } from '../../../../shared/utils/log';
import { HashedPassword } from '../../domain/HashedPassword';
import { Username } from '../../domain/Username';

/**
 * A Sequelize implementation of the `IUserRepository`
 *
 * @class UserRepository
 */
export class UserRepository implements IUserRepository {
  private models: any;
  private userMapper: UserMapper;

  /**
   * Creates an instance of UserRepository.
   *
   * @param {*} models
   * @memberof UserRepository
   */
  constructor(models) {
    this.models = models;
    this.userMapper = new UserMapper();
  }

  /**
   * Save a new user to the database.
   *
   * @param {string} username
   * @param {string} hashedPassword
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  // async createUser(username: string, hashedPassword: string): Promise<User> {
  //   // try to save user to database
  //   try {
  //     const dbUser = await this.models.user.create({
  //       username: username,
  //       password: hashedPassword,
  //     });
  //     // map from db to domain and return
  //     return this.userMapper.fromPersistence(dbUser);
  //   } catch (err) {
  //     // check to see what type of error was returned
  //     if (err.name === 'SequelizeUniqueConstraintError') {
  //       throw new Error('Duplicate username error');
  //     } else {
  //       throw new Error('Unexpected error');
  //     }
  //   }
  // }

  /**
   * Save the user in the database.
   *
   * @param {User} user
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  async createUser(user: User): Promise<User> {
    // try to save user to database
    try {
      const dbUser = await this.models.user.create({
        username: user.getUsernameString(),
        password: user.getHashedPasswordString(),
      });
      // map from db to domain and return
      return this.userMapper.fromPersistence(dbUser);
    } catch (err) {
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Duplicate username error');
      } else {
        throw new Error('Unexpected error');
      }
    }
  }

  /**
   * Get a user's password based on their username.
   *
   * @param {string} username
   * @return {Promise<HashedPassword>}
   * @memberof UserRepository
   */
  async getUserPasswordWithUsername(username: Username): Promise<HashedPassword> {
    try {
      // try to find user in database with username
      const dbUser = await this.models.user.findOne({
        where: {username: username.getString()},
      });

      if (dbUser === null) {
        // if no user was found
        throw new Error('No user found');
      } else {
        // return password hash
        return new HashedPassword(dbUser.password);
      }
    } catch (err) {
      throw new Error('No user found');
    }
  }
}
