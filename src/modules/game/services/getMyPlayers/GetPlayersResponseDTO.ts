/* eslint-disable max-len */
import {PlayerDTO} from '../../dtos/PlayerDTO';
import {GetMyPlayersResponse} from '../../../../shared/schemas/GetMyPlayersResponse';

/**
 * DTO implementation of CreatePlayerRequest.
 *
 * @export
 * @class CreatePlayerRequestDTO
 * @implements {CreatePlayerRequest}
 */
export class GetMyPlayersResponseDTO implements GetMyPlayersResponse {
  players: Array<PlayerDTO>;

  constructor(players: Array<PlayerDTO>) {
    this.players = players;
  }

  toJSON(): any {
    return this;
  }

  public get $players(): Array<PlayerDTO> {
    return this.players;
  }

  public set $players(value: Array<PlayerDTO>) {
    this.players = value;
  }
}
