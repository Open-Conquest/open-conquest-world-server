import {CreatePlayerRequest} from "../../../../shared/schemas/CreatePlayerRequest";
import {JWTDTO} from "src/shared/dtos/JWTDTO";

/**
 * CreatePlayerRequest DTO implementation.
 *
 * @export
 * @class CreatePlayerResponseDTO
 * @implements {CreatePlayerRequest}
 */
export class CreatePlayerResponseDTO implements CreatePlayerRequest {
  token: JWTDTO;
  playerName: string;

  /**
   * Creates an instance of CreatePlayerResponseDTO.
   *
   * @param {JWTDTO} token
   * @param {string} playerName
   * @memberof CreatePlayerResponseDTO
   */
  constructor(token: JWTDTO, playerName: string) {
    this.token = token;
    this.playerName = playerName;
  }

  toJSON(): any {
    return this;
  }
}
