/* eslint-disable require-jsdoc */
import {IDTO} from '../../../../shared/dtos/IDTO';
import { JWTDTO } from '../../../../shared/dtos/JWTDTO';
import { LoginUserResponse } from '../../../../shared/schemas/LoginUserResponse';
import { JWT } from '../../domain/JWT';
import { log } from 'src/shared/utils/log';

/**
 * Class is meant to represent the response to the loginUser request.
 *
 * @export
 * @class LoginUserResponseDTO
 */
export class LoginUserResponseDTO implements LoginUserResponse {
  username: string;
  token: JWTDTO;

  /**
   * Creates an instance of LoginUserResponseDTO.
   *
   * @param {string} username
   * @param {JWTDTO} token
   * @memberof LoginUserResponseDTO
   */
  constructor(username: string, token: JWTDTO) {
    this.username = username;
    this.token = token;
  }

  toJSON(): any {
    return this;
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }

  static fromJSON(json: any): LoginUserResponseDTO {
    return new LoginUserResponseDTO(
        json['username'],
        new JWTDTO(json['token'].value),
    );
  }

  static fromJSONString(json: string): LoginUserResponseDTO {
    throw new Error("Method not implemented.");
  }
}
