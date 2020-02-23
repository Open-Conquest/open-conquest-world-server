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
  token: JWTDTO;
  player: PlayerDTO;

  constructor(token: JWTDTO, player: PlayerDTO) {
    this.token = token;
    this.player = player;
  }

  static fromJSON(json: any): CreatePlayerRequestDTO {
    return new CreatePlayerRequestDTO(
        new JWTDTO(json.token.value),
        new PlayerDTO(json.player.name),
    );
  }
}
