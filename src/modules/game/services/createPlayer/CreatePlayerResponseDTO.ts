/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {CreatePlayerRequest} from '../../../../shared/schemas/CreatePlayerRequest';
import {PlayerDTO} from '../../dtos/PlayerDTO';

/**
 * CreatePlayerRequest DTO implementation.
 *
 * @export
 * @class CreatePlayerResponseDTO
 * @implements {CreatePlayerRequest}
 */
export class CreatePlayerResponseDTO implements CreatePlayerRequest {
  private player: PlayerDTO;

  /**
   * Creates an instance of CreatePlayerResponseDTO.
   *
   * @param {PlayerDTO} player
   * @memberof CreatePlayerResponseDTO
   */
  constructor(player: PlayerDTO) {
    this.player = player;
  }

  toJSON(): any {
    return this;
  }

  public get $player(): PlayerDTO {
    return this.player;
  }

  public set $player(value: PlayerDTO) {
    this.player = value;
  }
}
