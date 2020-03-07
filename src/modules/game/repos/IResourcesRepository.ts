import {Resources} from '../domain/Resources';
import {Player} from '../domain/Player';

export interface IResourcesRepository {
  createResources(player: Player, resources: Resources): Promise<Resources>
}
