import {UserDTO} from '../../user/dtos/UserDTO';
import {User} from '../../user/domain/User';
import {UserFactory} from '../../user/factories/UserFactory';

/**
 * Mapping definitions for the Map entity.
 *
 * @export
 * @class UserMapper
 */
export class UserMapper {
  private userFactory: UserFactory;

  /**
   * Creates an instance of UserMapper.
   * @memberof UserMapper
   */
  constructor() {
    this.userFactory = new UserFactory();
  }

  /**
   * Map a UserDTO to a User
   *
   * @param {UserDTO} userDTO
   * @return {User}
   * @memberof UserMapper
   */
  fromDTO(userDTO: UserDTO): User {
    if (userDTO === null) {
      return null;
    }

    return this.userFactory.createUserWithUsernameAndID(
        userDTO.$userID,
        userDTO.$username,
    );
  }

  /**
   * Map a User to a UserDTO
   * @param {User} user
   * @return {UserDTO}
   * @memberof UserMapper
   */
  toDTO(user: User): UserDTO {
    if (user === null) {
      return null;
    }

    return new UserDTO(
        user.$id.$value,
        user.$username.$value,
    );
  }
}
