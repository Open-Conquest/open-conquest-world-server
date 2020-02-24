import {User} from '../domain/User';
import {UserFactory} from '../factories/UserFactory';
import {UserDTO} from '../dtos/UserDTO';

/**
 * UserMapper is responsible for mappings between the domain `User` and the
 * Sequelize persistence representation of user.
 */
export class UserMapper {
  private userFactory: UserFactory

  /** Creates an instance of UserMapper. */
  constructor() {
    this.userFactory = new UserFactory();
  }

  /**
   * Create a domain entity `User` from a sequelize object.
   *
   * @param {*} dbUser
   * @return {User}
   * @memberof UserMapper
   */
  fromPersistence(dbUser: any): User {
    return this.userFactory.createUser(
        dbUser.user_id,
        dbUser.username,
        null,
        null,
        dbUser.password,
    );
  }

  /**
   * Create a domain entity from a UserDTO.
   *
   * @param {UserDTO} userDTO
   * @return {User}
   * @memberof UserMapper
   */
  fromDTO(userDTO: UserDTO): User {
    return this.userFactory.createUser(
        userDTO.$userID,
        userDTO.$username,
        null,
        null,
        null,
    );
  }
}
