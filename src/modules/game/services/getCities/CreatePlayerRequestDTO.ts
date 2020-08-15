import { GetCitiesRequest } from '../../../../shared/schemas/GetCitiesRequest';

/**
 * DTO implementation of CreatePlayerRequest.
 *
 * @export
 * @class CreatePlayerRequestDTO
 * @implements {CreatePlayerRequest}
 */
export class GetCitiesRequestDTO implements GetCitiesRequest {
  query: any;

  constructor(query: any) {
    this.query = query;
  }

  static fromJSON(json: any): GetCitiesRequestDTO {
    return new GetCitiesRequestDTO(json.query);
  }

  public get $query(): any {
    return this.query;
  }

  public set $query(value: any) {
    this.query = value;
  }
}
