import {IUserRepository} from '../IUserRepository';
import {User} from '../../domain/User';
import {Username} from '../../domain/Username';
import {UserMapper} from '../../mappers/UserMapper';
import {UserRepositoryErrors} from '../UserRepositoryErrors';

/**
 * A Sequelize implementation of the `IUserRepository`
 */
export class UserRepository implements IUserRepository {
  private models: any;
  private userMapper: UserMapper;

  /**
   * Creates an instance of UserRepository.
   * @param {*} models
   * @memberof UserRepository
   */
  constructor(models) {
    this.models = models;
    this.userMapper = new UserMapper();
  }

  /**
   * Save the user in the database.
   * @param {User} user the user entity to be created
   * @return {Promise<User>}
   */
  async createUser(user: User): Promise<User> {
    try {
      // try to save user to database
      const dbUser = await this.models.user.create({
        username: user.getUsernameString(),
        password: user.getHashedPasswordString(),
      });
      // return user entity
      return this.userMapper.fromPersistence(dbUser);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(UserRepositoryErrors.DuplicateUsername);
      }
      // if the error is unknown
      throw err;
    }
  }

  /**
   * Get a user's hashed password based on their username.
   * @param {string} username the user's username
   * @return {Promise<HashedPassword>}
   */
  async getUserPasswordWithUsername(username: Username): Promise<User> {
    // try to find user in database with username
    const dbUser = await this.models.user.findOne({
      where: {username: username.$value},
    });

    // if no user was found
    if (dbUser === null) {
      throw new Error(UserRepositoryErrors.NonexistentUser);
    }

    // return user entity with hashed password
    return this.userMapper.fromPersistence(dbUser);
  }
}
