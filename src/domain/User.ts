import {Entity, EntityId} from './Entity';

/**
 * Domain model for the user entity.
 *
 * @export
 * @class User
 * @extends {Entity}
 */
export class User extends Entity {
  /**
   * Creates an instance of User.
   *
   * @param {EntityId} id
   * @memberof User
   */
  constructor(id: EntityId) {
    super(id);
  }
}
