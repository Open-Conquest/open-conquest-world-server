import {IUserRepository} from '../IUserRepository';
import {models} from '../../models';
import {User} from '../../domain/User';
import * as bcrypt from 'bcryptjs';

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
   * Get a user with username.
   *
   * @param {string} username
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  getUserWithUsername(username: string): Promise<User> {
    const models = this.models;
    return new Promise( function(resolve, reject) {
      models.user.findOne({
        where: {username: username},
      })
          .then((user) => {
            // const newUser = User.fromSequelize(user);
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * Create a new user.
   *
   * @param {string} username
   * @param {string} password
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  createUser(username: string, password: string): Promise<User> {
    const models = this.models;
    return new Promise(function(resolve, reject) {
      // check if username and password are valid
      if (username === null || password === null || username.length < 10 || password.length < 10) {
        reject(new Error('Invalid username or password'));
      }

      // check if username is already taken
      models.user.findOne({
        where: {username: username},
      })
          .then((user) => {
            if (user != null) {
              reject(new Error('Username is taken'));
            }
            // hash password
            const hashedPassword = bcrypt.hashSync(password, 8);
            console.log(hashedPassword);
            // save user to database with salted password
            return models.user.create({
              username: username,
              password: hashedPassword,
            });
          })
          .then((registeredUser) => {
            const newRegisteredUser = new User(
                registeredUser.user_id,
                registeredUser.username,
            );
            resolve(newRegisteredUser);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
