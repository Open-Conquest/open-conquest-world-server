/* eslint-disable require-jsdoc */
import {User} from '../domain/User';
import { Username } from '../domain/Username';
import { Password } from '../domain/Password';
import { JWT } from '../domain/JWT';

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

  createUser(username: string, password: string, token: string): User {
    return new User(new Username(username), new Password(password), new JWT(token));
  }

  createUserWithUsername(username: string): User {
    return new User(new Username(username), null, null);
  }

  createUserWithPassword(username: string, password: string): User {
    return new User(new Username(username), new Password(password), null);
  }
}
