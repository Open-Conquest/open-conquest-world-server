import {IPlayerRepository} from '../IPlayerRepository';
import {Player} from '../../domain/Player';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import { log } from '../../../../shared/utils/log';

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
   * Save a new player to the database.
   *
   * @param {string} playername
   * @param {string} hashedPassword
   * @return {Promise<Player>}
   * @memberof PlayerRepository
   */
  async createPlayer(playername: string, hashedPassword: string): Promise<Player> {
    // try to save player to database
    try {
      const dbPlayer = await this.models.player.create({
        playername: playername,
        password: hashedPassword,
      });
      // map from db to domain and return
      return this.playerMapper.fromPersistence(dbPlayer);
    } catch (err) {
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Duplicate playername error');
      } else {
        throw new Error('Unexpected error');
      }
    }
  }

  /**
   * Get a player's password based on their playername.
   *
   * @param {string} playername
   * @return {Promise<HashedPassword>}
   * @memberof PlayerRepository
   */
  async getPlayerPasswordWithPlayername(playername: string): Promise<HashedPassword> {
    try {
      // try to find player in database with playername
      const dbPlayer = await this.models.player.findOne({
        where: {playername: playername},
      });

      if (dbPlayer === null) {
        // if no player was found
        throw new Error('No player found');
      } else {
        // return password hash
        return new HashedPassword(dbPlayer.password);
      }
    } catch (err) {
      throw new Error('No player found');
    }
  }
}
