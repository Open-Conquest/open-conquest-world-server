/* eslint-disable require-jsdoc */
import {LoginUserResponseError} from '../../../../shared/schemas/LoginUserResponseError';

/**
 * DTO for LoginUserResponseError message.
 *
 * @export
 * @class LoginUserResponseErrorDTO
 * @implements {LoginUserResponseError}
 */
export class LoginUserResponseErrorDTO implements LoginUserResponseError {
  message: string;

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
