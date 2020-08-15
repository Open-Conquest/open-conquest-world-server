import {BaseEndpoints} from '../../../shared/infra/ws/routing/BaseEndpoints';
import {MessageDTO} from '../../../shared/dtos/MessageDTO';
import {ServiceNames} from '../../../shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../shared/infra/ws/routing/ServiceOperations';
import { GetCitiesController, GetCitiesErrorResponses } from '../services/getCities/GetCitiesController';
import { GetCitiesRequestDTO } from '../services/getCities/CreatePlayerRequestDTO';
import { GetCitiesErrorResponseDTO } from '../services/getCities/GetCitiesErrorResponseDTO';
import { GetCitiesErrors } from '../services/getCities/GetCitiesErrors';
import {log} from '../../../shared/utils/log';

/**
 * CityEndpoints implements all of the endpoints responsible for handling
 * the operations housed under the City service.
 *
 * @export
 * @class CityEndpoints
 */
export class CityEndpoints extends BaseEndpoints {
  private getCitiesController: GetCitiesController;

  /**
   * Creates an instance of CityEndpoints.
   * @param {GetCitiesController} getCitiesController
   * @memberof CityEndpoints
   */
  constructor(getCitiesController: GetCitiesController) {
    super();

    this.serviceName = ServiceNames.City;

    this.handlers[ServiceOperations.GetCities] = this.getCities.bind(this);
    
    this.getCitiesController = getCitiesController;
  }

  /**
   * Endpoint implementation for getCities.
   *
   * @param {MessageDTO} message
   * @return {Promise<MessageDTO>}
   * @memberof CityEndpoints
   */
  async getCities(message: MessageDTO): Promise<MessageDTO> {
    try {
      // get authenticated requesting user
      const userDTO = message.$user;

      // parse request
      const getCitiesDTO = GetCitiesRequestDTO.fromJSON(message.$data);
      
      // get response
      const responseDTO = await this.getCitiesController.getCities(userDTO, getCitiesDTO);

      // format response dto
      return new MessageDTO(ServiceNames.City, ServiceOperations.GetCities, null, null, responseDTO);

    } catch (err) {
      // build error dto
      const errorDTO = new GetCitiesErrorResponseDTO(null);

      // choose error message
      switch (err.message) {
        case GetCitiesErrors.InvalidQuery:
          errorDTO.$message = GetCitiesErrorResponses.InvalidQuery;
          break;
        default:
          errorDTO.$message = 'Unknown internal error';
      }

      // format error response dto
      return new MessageDTO(ServiceNames.City, ServiceOperations.GetCitiesError, null, null, errorDTO.toJSON());
    }
  }
}
