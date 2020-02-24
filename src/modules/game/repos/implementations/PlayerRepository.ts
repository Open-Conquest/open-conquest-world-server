import {IPlayerRepository} from '../IPlayerRepository';
import {Player} from '../../domain/Player';
import {User} from '../../../user/domain/User';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {log} from '../../../../shared/utils/log';

/**
 * A Sequelize implementation of the `IPlayerRepository`
 *
 * @class PlayerRepository
 */
export class PlayerRepository implements IPlayerRepository {
  private models: any;
  private playerMapper: PlayerMapper;

  /**
   * Creates an instance of PlayerRepository.
   *
   * @param {*} models
   * @memberof PlayerRepository
   */
  constructor(models) {
    this.models = models;
    this.playerMapper = new PlayerMapper();
  }

  /**
   * Create a new player in the database.
   *
   * @param {User} user
   * @param {Player} newPlayer
   * @return {Promise<Player>}
   * @memberof PlayerRepository
   */
  async createPlayer(user: User, newPlayer: Player): Promise<Player> {
    // try to save player to database
    try {
      log.info('createPlayer user', user);
      const dbPlayer = await this.models.player.create({
        name: newPlayer.getNameString(),
        user_id: user.getId().getValue(),
      });
      // map from db to domain and return
      return this.playerMapper.fromPersistence(dbPlayer);
    } catch (err) {
      log.error(err.stack);
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Duplicate playername error');
      } else {
        throw new Error('Unexpected error');
      }
    }
  }
}
