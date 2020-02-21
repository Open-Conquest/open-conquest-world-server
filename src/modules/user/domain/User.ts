/* eslint-disable require-jsdoc */
import {Username} from "./UserName";
import {Password} from "./Password";
import {JWT} from "./JWT";
import {HashedPassword} from "./HashedPassword";

/**
 * Domain entity representation of a user.
 *
 * @export
 * @class User
 */
export class User {
  private username: Username;
  private password: Password;
  private token: JWT;
  private hashedPassword: HashedPassword;

  /**
   * Creates an instance of User.
   *
   * @param {string} username
   * @param {string} password
   * @param {JWT} token
   * @param {hashedPassword} hashedPassword
   * @memberof User
   */
  constructor(
      username: Username,
      password: Password,
      token: JWT,
      hashedPassword: HashedPassword,
  ) {
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
