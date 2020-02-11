import {Entity, EntityId} from './Entity';

/**
 * Domain model for the user entity.
 *
 * @export
 * @class User
 * @extends {Entity}
 */
export class User extends Entity {
  private username: string;
  private password: string;

  /**
   * Creates an instance of User.
   *
   * @param {number} id
   * @param {string} username
   * @memberof User
   */
  constructor(id: number, username: string) {
    super(id);
    this.username = username;
    this.password = null;
  }

  /**
   * Returns this user's username.
   *
   * @return {string}
   * @memberof User
   */
  getUsername(): string {
    return this.username;
  }

  /**
   * Set the password for this user.
   *
   * @param {string} password
   * @memberof User
   */
  setPassword(password: string) {
    this.password = password;
  }

  /**
   * Get this user's password.
   *
   * @return {string}
   * @memberof User
   */
  getPassword(): string {
    return this.password;
  }

  /**
   * Check if this user equals another user.
   *
   * @param {User} user
   * @return {boolean}
   * @memberof User
   */
  equals(user: User): boolean {
    return user.getUsername() === user.getUsername();
  }
}
