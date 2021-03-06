import {IUserRepository} from '../IUserRepository';
import {User} from '../../domain/User';
import {Username} from '../../domain/Username';
import {UserMapper} from '../../mappers/UserMapper';
import {UserRepositoryErrors} from '../UserRepositoryErrors';
import {BaseRepository} from '../../../../shared/infra/repos/BaseRepository';

/**
 * A Sequelize implementation of the `IUserRepository`
 */
export class UserRepository extends BaseRepository implements IUserRepository {
  private models: any;
  private userMapper: UserMapper;

  /**
   * Creates an instance of UserRepository.
   * @param {*} models
   * @memberof UserRepository
   */
  constructor(models) {
    super();
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
      const t = this.asyncLocalStorage.getStore();
      // try to save user to database
      const dbUser = await this.models.user.create({
        username: user.$username.$value,
        password: user.$hashedPassword.$value,
      }, {transaction: t});
      // return user entity
      return this.userMapper.fromPersistence(dbUser);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(UserRepositoryErrors.DuplicateUsername);
      }
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
