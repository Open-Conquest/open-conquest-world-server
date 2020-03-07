/* eslint-disable require-jsdoc */
import {CreatePlayerResponseError} from '../../../../shared/schemas/CreatePlayerErrorResponse';

/**
 * DTO for CreatePlayerErrorResponse
 *
 * @export
 * @class CreatePlayerErrorResponseDTO
 * @implements {CreatePlayerResponseError}
 */
export class CreatePlayerErrorResponseDTO implements CreatePlayerResponseError {
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
