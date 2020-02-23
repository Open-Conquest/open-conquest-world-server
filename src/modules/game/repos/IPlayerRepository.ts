import {Player} from '../domain/Player';
import {User} from '../../user/domain/User';

export interface IPlayerRepository {
  createPlayer(user: User, newPlayer: Player): Promise<Player>
}
