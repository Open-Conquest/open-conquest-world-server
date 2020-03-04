import {Player} from '../domain/Player';
import {User} from '../../user/domain/User';

export interface IResourceRepository {
  getPlayer(player: Player): Promise<Player>
  createPlayer(user: User, newPlayer: Player): Promise<Player>
}
