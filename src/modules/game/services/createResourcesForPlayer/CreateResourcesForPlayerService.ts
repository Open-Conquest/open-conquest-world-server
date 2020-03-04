import {CreateResourcesForPlayerErrors} from './CreateResourcesForPlayerErrors';
import {log} from '../../../../shared/utils/log';
import {IResourcesRepository} from '../../repos/IResourcesRepository';
import {Resources} from '../../domain/Resources';
import {Player} from '../../domain/Player';
import {ResourcesRepositoryErrors} from '../../repos/ResourcesRepositoryErrors';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class CreateResourcesForPlayerService
 */
export class CreateResourcesForPlayerService {
  private resourcesRepository: IResourcesRepository;

  /**
   * Creates an instance of CreateResourcesForPlayerService.
   *
   * @param {IResourcesRepository} resourcesRepository
   * @memberof CityServices
   */
  constructor(resourcesRepository: IResourcesRepository) {
    this.resourcesRepository = resourcesRepository;
  }

  /**
   * Get the best tile to create a city for a new player at.
   *
   * @param {Player} player
   * @param {Resources} resources
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async createResources(player: Player, resources: Resources): Promise<Resources> {
    try {
      return await this.resourcesRepository.createResources(player, resources);
    } catch (err) {
      switch (err.message) {
        case ResourcesRepositoryErrors.NonexistentPlayer:
          // there are some errors that we know
          throw new Error(CreateResourcesForPlayerErrors.NonexistentPlayer);
        default:
          throw err;
      }
    }
  }
}
