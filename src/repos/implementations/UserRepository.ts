import {IUserRepository} from '../IUserRepository';
import {models} from '../../models';
import {User} from '../../domain/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as config from '../../../config/real-config';

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
            // if there is no user with username
            if (user === null) {
              reject(new Error('No user with username: ' + username));
            }
            resolve(new User(user.user_id, user.username));
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * Get a user and their password.
   *
   * @param {string} username
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  getUserPasswordWithUsername(username: string): Promise<User> {
    const models = this.models;
    return new Promise( function(resolve, reject) {
      models.user.findOne({
        where: {username: username},
      })
          .then((user) => {
            // if there is no user
            if (user === null) {
              reject(new Error('No user with username: ' + username));
            }
            const newUser = new User(user.user_id, user.username);
            newUser.setPassword(user.password);
            resolve(newUser);
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
   * @param {string} hashedPassword
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  createUser(username: string, hashedPassword: string): Promise<User> {
    const models = this.models;
    return new Promise(function(resolve, reject) {
      // check if username is already taken
      models.user.findOne({
        where: {username: username},
      })
          .then((user) => {
            if (user != null) {
              reject(new Error('Username is taken'));
            }
            // save user to database with salted password
            return models.user.create({
              username: username,
              password: hashedPassword,
            });
          })
          .then((registeredUser) => {
            const user = new User(
                registeredUser.user_id,
                registeredUser.username,
            );
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
