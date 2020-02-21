/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {CreatePlayerRequest} from '../../../../shared/schemas/CreatePlayerRequest';
import {JWTDTO} from '../../../../shared/dtos/JWTDTO';
import { CreatePlayerResponseDTO } from './CreatePlayerResponseDTO';

/**
 * DTO implementation of CreatePlayerRequest.
 *
 * @export
 * @class CreatePlayerRequestDTO
 * @implements {CreatePlayerRequest}
 */
export class CreatePlayerRequestDTO implements CreatePlayerRequest {
  token: JWTDTO;
  playerName: string;

  constructor(token: JWTDTO, playerName: string) {
    this.token = token;
    this.playerName = playerName;
  }

  static fromJSON(json: any): CreatePlayerRequestDTO {
    return new CreatePlayerResponseDTO(
        new JWTDTO(json.token.value),
        json.playerName,
    );
  }
}
