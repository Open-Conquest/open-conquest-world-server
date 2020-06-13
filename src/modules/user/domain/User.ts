/* eslint-disable require-jsdoc */
import {EntityID} from '../../../shared/domain/EntityID';
import {Entity} from '../../../shared/domain/Entity';
import {Username} from './Username';
import {Password} from './Password';
import {JWT} from './JWT';
import {HashedPassword} from './HashedPassword';

/**
 * Domain entity representation of a user.
 */
export class User extends Entity {
  private username: Username;
  private password: Password;
  private token: JWT;
  private hashedPassword: HashedPassword;

  /**
   * Creates an instance of User.
   * @param {EntityID} id
   * @param {Username} username
   * @param {Password} password
   * @param {JWT} token
   * @param {hashedPassword} hashedPassword
   */
  constructor(
      id: EntityID,
      username: Username,
      password: Password,
      token: JWT,
      hashedPassword: HashedPassword,
  ) {
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
    return this.username.$value;
  }

  getHashedPasswordString(): string {
    return this.hashedPassword.getString();
  }

  public get $username(): Username {
    return this.username;
  }

  public get $password(): Password {
    return this.password;
  }

  public get $token(): JWT {
    return this.token;
  }

  public get $hashedPassword(): HashedPassword {
    return this.hashedPassword;
  }

  public set $username(value: Username) {
    this.username = value;
  }

  public set $password(value: Password) {
    this.password = value;
  }

  public set $token(value: JWT) {
    this.token = value;
  }

  public set $hashedPassword(value: HashedPassword) {
    this.hashedPassword = value;
  }
}
