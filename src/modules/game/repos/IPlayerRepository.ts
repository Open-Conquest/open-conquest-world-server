import {Player} from '../domain/Player';
import {User} from '../../user/domain/User';

export interface IPlayerRepository {
  getPlayer(player: Player): Promise<Player>
  createPlayer(user: User, newPlayer: Player): Promise<Player>
}
