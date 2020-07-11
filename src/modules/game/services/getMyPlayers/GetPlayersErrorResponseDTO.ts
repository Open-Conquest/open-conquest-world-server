/* eslint-disable require-jsdoc */
import {GetMyPlayersErrorResponse} from '../../../../shared/schemas/GetMyPlayersErrorResponse';

/**
 * DTO for CreatePlayerErrorResponse
 *
 * @export
 * @class CreatePlayerErrorResponseDTO
 * @implements {CreatePlayerResponseError}
 */
export class GetPlayersErrorResponseDTO implements GetMyPlayersErrorResponse {
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
