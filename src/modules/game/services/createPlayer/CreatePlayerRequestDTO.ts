/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {CreatePlayerRequest} from '../../../../shared/schemas/CreatePlayerRequest';
import {JWTDTO} from '../../../../shared/dtos/JWTDTO';
import {PlayerDTO} from '../../dtos/PlayerDTO';

/**
 * DTO implementation of CreatePlayerRequest.
 *
 * @export
 * @class CreatePlayerRequestDTO
 * @implements {CreatePlayerRequest}
 */
export class CreatePlayerRequestDTO implements CreatePlayerRequest {
  player: PlayerDTO;

  constructor(player: PlayerDTO) {
    this.player = player;
  }

  static fromJSON(json: any): CreatePlayerRequestDTO {
    return new CreatePlayerRequestDTO(
        new PlayerDTO(json.player.name),
    );
  }

  public get $player(): PlayerDTO {
    return this.player;
  }

  public set $player(value: PlayerDTO) {
    this.player = value;
  }
}
