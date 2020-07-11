import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {User} from 'src/modules/user/domain/User';
import {Player} from '../../domain/Player';

/**
 * Get players.
 *
 * @export
 * @class GetPlayersService
 */
export class GetPlayersService {
  private playerRepository: IPlayerRepository;

  /**
   * Creates an instance of CreateResourcesForPlayerService.
   *
   * @param {IPlayerRepository} playerRepository
   * @memberof CityServices
   */
  constructor(playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository;
  }

  /**
   * Get the best tile to create a city for a new player at.
   *
   * @param {User} user
   * @return {Promise<Array<Player>>}
   * @memberof GetPlayersService
   */
  async getPlayers(user: User): Promise<Array<Player>> {
    return await this.playerRepository.getPlayers(user);
  }
}
