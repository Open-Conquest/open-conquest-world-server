import {Player} from '../domain/Player';
import {PlayerFactory} from '../factories/PlayerFactory';
import {PlayerDTO} from '../dtos/PlayerDTO';

/**
 * PlayerMapper is responsible for mappings between the domain `Player`
 * and the persistence (sequelize) representation of a player.
 */
export class PlayerMapper {
  private playerFactory: PlayerFactory

  /** Creates an instance of PlayerMapper. */
  constructor() {
    this.playerFactory = new PlayerFactory();
  }

  /**
   * Create a domain entity `Player` from a sequelize object.
   *
   * @param {*} dbPlayer
   * @return {Player}
   * @memberof PlayerMapper
   */
  fromPersistence(dbPlayer: any): Player {
    return this.playerFactory.createPlayer(
        dbPlayer.player_id,
        dbPlayer.name,
    );
  }

  /**
   * Create a player entity from the dto.
   *
   * @param {PlayerDTO} dto
   * @return {Player}
   * @memberof PlayerMapper
   */
  fromDTO(dto: PlayerDTO): Player {
    return this.playerFactory.createPlayer(
        dto.$playerID,
        dto.$name,
    );
  }

  /**
   * Create a dto from a player entity.
   *
   * @param {Player} player
   * @return {PlayerDTO}
   * @memberof PlayerMapper
   */
  toDTO(player: Player): PlayerDTO {
    let playerID = null;
    if (player.$id != null) {
      playerID = player.$id.$value;
    }
    return new PlayerDTO(
        playerID,
        player.getNameString(),
    );
  }
}
