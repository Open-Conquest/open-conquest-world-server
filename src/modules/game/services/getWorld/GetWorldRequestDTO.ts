/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {GetWorldRequest} from '../../../../shared/schemas/GetWorldRequest';

/**
 * DTO implementation of GetWorldRequest.
 *
 * @export
 * @class GetWorldRequestDTO
 * @implements {GetWorldRequestDTO}
 */
export class GetWorldRequestDTO implements GetWorldRequest {
  worldID: number;

  constructor(worldID: number) {
    this.worldID = worldID;
  }

  static fromJSON(json: any): GetWorldRequestDTO {
    return new GetWorldRequestDTO(
        json.worldID,
    );
  }

  public get $worldID(): number {
    return this.worldID;
  }

  public set $worldID(value: number) {
    this.worldID = value;
  }
}
