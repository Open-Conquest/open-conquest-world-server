/* eslint-disable require-jsdoc */
import {Username} from "./UserName";
import {Password} from "./Password";
import {JWT} from "./JWT";

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

  /**
   * Creates an instance of User.
   *
   * @param {string} username
   * @param {string} password
   * @param {JWT} token
   * @memberof User
   */
  constructor(
      username: Username,
      password: Password,
      token: JWT,
  ) {
    this.username = username;
    this.password = password;
    this.token = token;
  }

  getUsername(): Username {
    return this.username;
  }

  getUsernameString(): string {
    return this.username.getString();
  }
}
