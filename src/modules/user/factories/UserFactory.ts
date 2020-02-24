/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {EntityID} from '../../../shared/domain/EntityId';
import {User} from '../domain/User';
import {Username} from '../domain/Username';
import {Password} from '../domain/Password';
import {JWT} from '../domain/JWT';
import {HashedPassword} from '../domain/HashedPassword';

/**
 * This class is meant to handle the construction of `User` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of User.
 *
 * @class UserFactory
 */
export class UserFactory {
  /**
   * Creates an instance of UserFactory.
   * @memberof UserFactory
   */
  constructor() {}

  createUser(id: number, username: string, password: string, token: string, hashedPassword: string): User {
    return new User(
        new EntityID(id),
        new Username(username),
        new Password(password),
        new JWT(token),
        new HashedPassword(hashedPassword),
    );
  }

  createUserWithUsername(username: string): User {
    return new User(
        null,
        new Username(username),
        null,
        null,
        null,
    );
  }

  createUserWithPassword(username: string, password: string): User {
    return new User(
        null,
        new Username(username),
        new Password(password),
        null,
        null,
    );
  }

  createUserWithHashedPassword(id: number, username: string, hashedPassword: string): User {
    return new User(
        new EntityID(id),
        new Username(username),
        null,
        null,
        new HashedPassword(hashedPassword),
    );
  }
}
