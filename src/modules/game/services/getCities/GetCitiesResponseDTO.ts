import {CityDTO} from '../../dtos/CityDTO';
import { GetCitiesResponse } from '../../../../shared/schemas/GetCitiesResponse';

/**
 * GetCitiesResponse DTO implementation.
 *
 * @export
 * @class GetCitiesResponseDTO
 * @implements {CreatePlayerRequest}
 */
export class GetCitiesResponseDTO implements GetCitiesResponse {
  cities: Array<CityDTO>;

  /**
   * Creates an instance of GetCitiesResponseDTO.
   *
   * @param {Array<CityDTO>} cities 
   * @memberof GetCitiesResponseDTO
   */
  constructor(cities: Array<CityDTO>) {
    this.cities = cities;
  }

  toJSON(): any {
    return this;
  }
}
