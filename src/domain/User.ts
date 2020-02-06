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

  /**
   * Creates an instance of User.
   *
   * @param {EntityId} id
   * @param {string} username
   * @memberof User
   */
  constructor(id: EntityId, username: string) {
    super(id);
    this.username = username;
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
