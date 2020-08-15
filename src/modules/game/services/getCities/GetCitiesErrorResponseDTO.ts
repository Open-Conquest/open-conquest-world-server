import { GetCitiesErrorResponse } from "../../../../shared/schemas/GetCitiesErrorResponse";

/**
 * DTO for CreatePlayerErrorResponse
 *
 * @export
 * @class GetCitiesErrorResponseDTO
 * @implements {CreatePlayerResponseError}
 */
export class GetCitiesErrorResponseDTO implements GetCitiesErrorResponse {
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
