import {log} from '../../../../shared/utils/log';
import {GetWorldErrors} from './GetWorldErrors';
import {GetWorldService} from './GetWorldService';
import {WorldMapper} from '../../mappers/WorldMapper';
import {GetWorldResponseDTO} from './GetWorldResponseDTO';
import {GetWorldErrorResponseDTO} from './GetWorldErrorResponseDTO';

/**
 *
 *
 * @export
 * @class GetWorldController
 * @extends {BaseServices}
 */
export class GetWorldController {
  private getWorldService: GetWorldService;
  private worldMapper: WorldMapper;

  /**
   * Creates an instance of GetWorldController.
   *
   * @param {GetWorldService} getWorldService
   * @memberof GetWorldController
   */
  constructor(getWorldService: GetWorldService) {
    this.getWorldService = getWorldService;
    this.worldMapper = new WorldMapper();
  }

  /**
   * This method accepts a `GetWorldRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {GetWorldRequestDTO} incomingDTO
   * @return {Promise<GetWorldResponseDTO | GetWorldErrorResponseDTO>}
   * @memberof GetWorldController
   */
  async getWorld(): Promise<GetWorldResponseDTO | GetWorldErrorResponseDTO> {
    try {
      const world = await this.getWorldService.getWorld();
      const worldDTO = this.worldMapper.toDTO(world);
      return new GetWorldResponseDTO(
          worldDTO,
      );
    } catch (err) {
      // check error message and throw appropriate error for caller to handle
      switch (err.message) {
        case GetWorldErrors.NonexistentWorld:
          throw err;
        default:
          log.error('Unknown error in GetWorldController', err.stack);
          throw new Error(GetWorldErrors.UnknownError);
      }
    }
  }
}
