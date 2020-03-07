/* eslint-disable require-jsdoc */
import {RegisterUserResponseError} from '../../../../../src/shared/schemas/RegisterUserErrorResponse';

/**
 * DTO for RegisterUserErrorResponse
 *
 * @export
 * @class RegisterUserErrorResponseDTO
 * @implements {RegisterUserResponseError}
 */
export class RegisterUserErrorResponseDTO implements RegisterUserResponseError {
  message: string

  constructor(message: string) {
    this.message = message;
  }

  public get $message(): string {
    return this.message;
  }

  public set $message(message: string) {
    this.message = message;
  }

  toJSON(): any {
    return this;
  }
}
