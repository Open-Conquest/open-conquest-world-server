import {Player} from '../domain/Player';
import {User} from '../../user/domain/User';
import {Army} from '../domain/Army';

export interface IPlayerRepository {
  getPlayer(player: Player): Promise<Player>
  createPlayer(user: User, newPlayer: Player): Promise<Player>
  getAllPlayers(): Promise<Array<Player>>
  updatePlayerArmy(player: Player, army: Army): Promise<Player>
}
