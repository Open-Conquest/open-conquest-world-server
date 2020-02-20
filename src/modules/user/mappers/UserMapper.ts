import { User } from "../domain/User";
import { UserFactory } from '../factories/UserFactory';

/**
 * UserMapper is responsible for mappings between the domain `User` and `DTO`s
 * and the domain `User` and its sequelize representation.
 */
export class UserMapper {
  private _userFactory: UserFactory
  /** Creates an instance of UserMapper. */
  constructor() {
    this._userFactory = new UserFactory();
  }

  /**
   * Create a domain entity `User` from a sequelize object.
   *
   * @param {*} dbUser
   * @return {User}
   * @memberof UserMapper
   */
  fromPersistence(dbUser: any): User {
    return this._userFactory.createUserWithUsername(dbUser.username);
  }
}
