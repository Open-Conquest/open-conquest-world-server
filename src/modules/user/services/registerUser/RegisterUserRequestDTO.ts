/* eslint-disable require-jsdoc */
import {IDTO} from '../../../../shared/dtos/IDTO';
import {RegisterUserRequest} from '../../../../shared/schemas/RegisterUserRequest';
import {UserCredentialsDTO} from '../../dtos/UserCredentialsDTO';
import {RegisterUserErrors} from './RegisterUserErrors';

/**
 * This class is meant to represent the data in the registerUser request.
 * You can find the specification for this DTO in the json schema for the
 * RegisterUserRequest.
 *
 * @export
 * @class RegisterUserDTO
 */
export class RegisterUserRequestDTO implements RegisterUserRequest {
  credentials: UserCredentialsDTO;

  /**
   * Creates an instance of RegisterUserRequestDTO.
   *
   * @param {UserCredentialsDTO} credentials
   * @memberof RegisterUserRequestDTO
   */
  constructor(credentials: UserCredentialsDTO) {
    this.credentials = credentials;
  }

  toJSON(): any {
    return this;
  }

  toJSONString(): string {
    throw new Error("Method not implemented.");
  }

  static fromJSON(json: any): RegisterUserRequestDTO {
    try {
      return new RegisterUserRequestDTO(
          new UserCredentialsDTO(
              json.username,
              json.password,
          ),
      );
    } catch (err) {
      throw new Error(RegisterUserErrors.BadUsername);
    }
  }

  static fromJSONString(json: string): RegisterUserRequestDTO {
    throw new Error("Method not implemented.");
  }

  public get $credentials(): UserCredentialsDTO {
    return this.credentials;
  }

  public set $credentials(value: UserCredentialsDTO) {
    this.credentials = value;
  }
}
