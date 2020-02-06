import {User} from '../../domain/User';
import {models} from '../../models';

/**
 * A Sequelize implementation of the `IUserRepository`
 *
 * @class UserRepository
 */
export class UserRepository {
  /**
   * Creates an instance of UserRepository.
   *
   * @memberof UserRepository
   */
  constructor() {}

  /**
   * Gets all of the users in this world.
   *
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  getAllUsers(): Promise<User> {
    return new Promise(function(resolve, reject) {
      models.user.findAll({})
          .then((users) => {
            resolve(users);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * Create a new user.
   *
   * @param {User} user
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  createNewUser(user: User): Promise<User> {
    return new Promise(function(resolve, reject) {
      models.user.create({
        user_name: user.getUsername(),
      })
          .then((user) => {
            // map db response to domain user
            const newUser = new User(user.user_id, user.user_name);
            resolve(newUser);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
