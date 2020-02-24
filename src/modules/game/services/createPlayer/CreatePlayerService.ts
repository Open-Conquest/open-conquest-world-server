import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {PlayerFactory} from '../../factories/PlayerFactory';
import {Player} from '../../domain/Player';
import {User} from '../../../../modules/user/domain/User';
import {log} from '../../../../shared/utils/log';

/**
 * Coordinate between domain and persistence layers to create player entities.
 *
 * @export
 * @class PlayerServices
 */
export class CreatePlayerService {
  private playerRepository: IPlayerRepository;
  private playerFactory: PlayerFactory;

  /**
   * Creates an instance of PlayerServices.
   *
   * @param {IPlayerRepository} playerRepository
   * @memberof PlayerServices
   */
  constructor(playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository;
    this.playerFactory = new PlayerFactory();
  }

  /**
   * Create a new player for a user.
   *
   * @param {User} user
   * @param {Player} player
   * @return {Promise<Response>}
   * @memberof PlayerServices
   */
  async createPlayer(user: User, player: Player): Promise<Player> {
    // see if a player with the name exists
    const existingPlayer = await this.playerRepository.getPlayer(player);
    if (existingPlayer !== null) {
      // player with name already exists
      throw new Error('Playername taken');
    }

    // if the name isn't taken save player to database & return new player
    return await this.playerRepository.createPlayer(user, player);
  }
}
