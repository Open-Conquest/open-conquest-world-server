/* eslint-disable require-jsdoc */
import {IDTO} from '../../../../shared/dtos/IDTO';
import {JWTDTO} from '../../../../shared/dtos/JWTDTO';
import {RegisterUserResponse} from '../../../../shared/schemas/RegisterUserResponse';

/**
 * Class is meant to represent the response to the registerUser request.
 *
 * @export
 * @class RegisterUserResponseDTO
 */
export class RegisterUserResponseDTO implements RegisterUserResponse {
  username: string;
  token: JWTDTO;

  /**
   * Creates an instance of RegisterUserResponseDTO.
   *
   * @param {string} username
   * @param {JWTDTO} token
   * @memberof RegisterUserResponseDTO
   */
  constructor(username: string, token: JWTDTO) {
    this.username = username;
    this.token = token;
  }

  toJSON(): any {
    return this;
  }

  toJSONString(): string {
    return JSON.stringify(this.toJSONString());
  }

  static fromJSON(json: any): RegisterUserResponseDTO {
    return new RegisterUserResponseDTO(
        json['username'],
        new JWTDTO(json['token'].value),
    );
  }

  static fromJSONString(json: string): RegisterUserResponseDTO {
    throw new Error("Method not implemented.");
  }
}
