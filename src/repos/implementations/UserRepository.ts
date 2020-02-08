import {User} from '../../domain/User';
import {models} from '../../models';
import { IUserRepository } from '../IUserRepository';

/**
 * A Sequelize implementation of the `IUserRepository`
 *
 * @class UserRepository
 */
export class UserRepository implements IUserRepository {
  private models: any;
  /**
   * Creates an instance of UserRepository.
   *
   * @param {*} models
   * @memberof UserRepository
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Gets all of the users in this world.
   *
   * @return {Promise<Array<User>>}
   * @memberof UserRepository
   */
  getAllUsers(): Promise<Array<User>> {
    const models = this.models;
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
  createUser(user: User): Promise<User> {
    const models = this.models;
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
