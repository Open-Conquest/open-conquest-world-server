import {Player} from '../domain/Player';
import {HashedPassword} from '../domain/HashedPassword';

export interface IPlayerRepository {
  createPlayer(playername: string, hashedPassword: string): Promise<Player>
  getPlayerPasswordWithPlayername(playername: string): Promise<HashedPassword>
}
