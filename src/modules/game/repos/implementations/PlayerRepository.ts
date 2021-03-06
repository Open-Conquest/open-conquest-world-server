import {IPlayerRepository} from '../IPlayerRepository';
import {Player} from '../../domain/Player';
import {User} from '../../../user/domain/User';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {log} from '../../../../shared/utils/log';
import {PlayerRepositoryErrors} from '../PlayerRepositoryErrors';
import {Army} from '../../domain/Army';

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
      const dbPlayer = await this.models.player.create({
        name: newPlayer.$name.$value,
        user_id: user.$id.$value,
      });
      // map from db to domain and return
      return this.playerMapper.fromPersistence(dbPlayer);
    } catch (err) {
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(PlayerRepositoryErrors.DuplicatePlayername);
      } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error(PlayerRepositoryErrors.NonexistentUser);
      } else {
        throw err;
      }
    }
  }

  /**
   * Get all the player entities that belong to user.
   *
   * @param {User} user
   * @return {Promise<Array<Player>>}
   * @memberof PlayerRepository
   */
  async getPlayers(user: User): Promise<Array<Player>> {
    // try to save player to database
    try {
      const dbPlayers = await this.models.player.findAll({
        where: {
          user_id: user.$id.$value,
        },
      });
      const players = [];
      for (let i = 0; i < dbPlayers.length; i++) {
        players.push(this.playerMapper.fromPersistence(dbPlayers[i]));
      }
      return players;
    } catch (err) {
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          throw new Error(PlayerRepositoryErrors.NonexistentUser);
        default:
          throw err;
      }
    }
  }

  /**
   * Get a player from the database that is the Player entity passed as an
   * argument.
   *
   * @param {Player} player
   * @return {Promise<Player>}
   * @memberof PlayerRepository
   */
  async getPlayer(player: Player): Promise<Player> {
    // try to find the player in the database
    const dbPlayer = await this.models.player.findOne({
      where: {
        name: player.$name.$value,
      },
    });

    // if player exists return player
    if (dbPlayer !== null) {
      return this.playerMapper.fromPersistence(dbPlayer);
    } else {
      // if player doesn't exist return null
      return null;
    }
  }

  /**
   * Get all of the players in the world.
   *
   * @return {Promise<Array<Player>>}
   * @memberof PlayerRepository
   */
  async getAllPlayers(): Promise<Array<Player>> {
    const dbPlayers = await this.models.player.findAll();
    const players = [];
    for (let i = 0; i < dbPlayers.length; i++) {
      players.push(this.playerMapper.fromPersistence(dbPlayers[i]));
    }
    return players;
  }

  /**
   * Update the player's army_id in the database.
   *
   * @param {Player} player
   * @param {Army} army
   * @return {Promise<Player>}
   * @memberof PlayerRepository
   */
  async updatePlayerArmy(player: Player, army: Army): Promise<Player> {
    try {
      let dbPlayer = await this.models.player.findOne({
        where: {
          name: player.$name.$value,
        },
      });

      if (dbPlayer === null) {
        throw new Error(PlayerRepositoryErrors.NonexistentPlayer);
      }

      dbPlayer = await dbPlayer.update({
        army_id: army.$id.$value,
      });

      return this.playerMapper.fromPersistence(dbPlayer);
    } catch (err) {
      // check to see what type of error was returned
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(PlayerRepositoryErrors.DuplicatePlayername);
      } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error(PlayerRepositoryErrors.NonexistentUser);
      } else {
        throw err;
      }
    }
  }
}
