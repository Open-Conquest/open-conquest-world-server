/* eslint-disable require-jsdoc */
import {LoginUserRequest} from '../../../../shared/schemas/LoginUserRequest';
import {UserCredentialsDTO} from '../../dtos/UserCredentialsDTO';

/**
 * DTO representation of LoginUserRequest.
 *
 * @export
 * @class LoginRequestRequestDTO
 * @implements {LoginUserRequest}
 */
export class LoginUserRequestDTO implements LoginUserRequest {
  credentials: UserCredentialsDTO;

  /**
   * Creates an instance of LoginRequestRequestDTO.
   *
   * @param {UserCredentialsDTO} credentials
   * @memberof LoginRequestRequestDTO
   */
  constructor(credentials: UserCredentialsDTO) {
    this.credentials = credentials;
  }

  toJSON(): any {
    return this;
  }

  static fromJSON(data: any) {
    return new LoginUserRequestDTO(
        new UserCredentialsDTO(
            data.credentials.username,
            data.credentials.password,
        ),
    );
  }
}
