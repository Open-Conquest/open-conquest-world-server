import { UserCredentials } from "../domain/UserCredentials";
import { UserCredentialsDTO } from "../dtos/UserCredentialsDTO";
import { Username } from "../domain/UserName";
import { Password } from "../domain/Password";

/**
 * UserMapper is responsible for mappings between the domain `User` and `DTO`s
 * and the domain `User` and its sequelize representation.
 */
export class UserCredentialsMapper {
  /** Creates an instance of UserMapper. */
  constructor() {}

  /**
   * Create a domain entity `User` from a sequelize object.
   *
   * @param {UserCredentialsDTO} dto
   * @return {User}
   * @memberof UserMapper
   */
  fromDTO(dto: UserCredentialsDTO): UserCredentials {
    return new UserCredentials(
        new Username(dto.username),
        new Password(dto.password),
    );
  }
}
