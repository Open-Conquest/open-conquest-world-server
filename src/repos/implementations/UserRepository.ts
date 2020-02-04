import {User} from '../../domain/User';
import {models} from '../../models';

/**
 * A Sequelize implementation of the `IUserRepository`
 * @class UserRepository
 */
export class UserRepository {
  /**
   * Creates an instance of UserRepository.
   * @memberof UserRepository
   */
  constructor() {}

  /**
   * Gets all of the users in this world.
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
}
