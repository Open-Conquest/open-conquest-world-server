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
    try {
      // try to create player entity in database
      return await this.playerRepository.createPlayer(user, player);
    } catch (err) {
      // check if an expected eror was thrown
      throw new Error('Error while creating player');
    }
  }
}
