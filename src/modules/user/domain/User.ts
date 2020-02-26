/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {EntityID} from '../../../shared/domain/EntityId';
import {Entity} from '../../../shared/domain/Entity';
import {Username} from './UserName';
import {Password} from './Password';
import {JWT} from './JWT';
import {HashedPassword} from './HashedPassword';

/**
 * Domain entity representation of a user.
 *
 * @export
 * @class User
 */
export class User extends Entity {
  private username: Username;
  private password: Password;
  private token: JWT;
  private hashedPassword: HashedPassword;

  /**
   * Creates an instance of User.
   *
   * @param {EntityID} id
   * @param {Username} username
   * @param {Password} password
   * @param {JWT} token
   * @param {hashedPassword} hashedPassword
   * @memberof User
   */
  constructor(id: EntityID, username: Username, password: Password, token: JWT, hashedPassword: HashedPassword) {
    super(id);
    this.username = username;
    this.password = password;
    this.token = token;
    this.hashedPassword = hashedPassword;
  }

  getUsername(): Username {
    return this.username;
  }

  getUsernameString(): string {
    return this.username.getString();
  }

  getHashedPasswordString(): string {
    return this.hashedPassword.getString();
  }
}
