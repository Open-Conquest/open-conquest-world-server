import {log} from '../../../../shared/utils/log';
import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {IUserRepository} from '../../../user/repos/IUserRepository';
import {User} from 'src/modules/user/domain/User';
import {Player} from '../../domain/Player';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class DoesPlayerBelongToUserService
 */
export class DoesPlayerBelongToUserService {
  private playerRepository: IPlayerRepository;

  /**
   * Creates an instance of DoesPlayerBelongToUserService.
   * @param {IPlayerRepository} $playerRepository
   * @memberof DoesPlayerBelongToUserService
   */
  constructor(
      $playerRepository: IPlayerRepository,
  ) {
    this.playerRepository = $playerRepository;
  }

  /**
   * Check to see if a player belongs to user.
   *
   * @param {User} user
   * @param {Player} player
   * @return {Promise<boolean>}
   * @memberof DoesPlayerBelongToUserService
   */
  async check(user: User, player: Player): Promise<boolean> {
    try {
      const players = await this.playerRepository.getPlayers(user);
      // check to see if player exists in players
      for (let i = 0; i < players.length; i++) {
        // if player equals one of the player's that the user owns return true
        if (player.$id.$value === players[i].$id.$value &&
            player.$name.$value === players[i].$name.$value) {
          return true;
        }
      }
      // player does not equal any of the players in players
      return false;
    } catch (err) {
      throw err;
    }
  }
}
