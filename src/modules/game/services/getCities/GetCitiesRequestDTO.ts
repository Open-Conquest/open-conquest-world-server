import { GetCitiesRequest } from '../../../../shared/schemas/GetCitiesRequest';
import { PlayerDTO } from '../../dtos/PlayerDTO';

/**
 * DTO implementation of CreatePlayerRequest.
 *
 * @export
 * @class CreatePlayerRequestDTO
 * @implements {CreatePlayerRequest}
 */
export class GetCitiesRequestDTO implements GetCitiesRequest {
  player: PlayerDTO;

  constructor(player: any) {
    this.player = player;
  }

  static fromJSON(json: any): GetCitiesRequestDTO {
    return new GetCitiesRequestDTO(json.player);
  }

  public get $player(): any {
    return this.player;
  }

  public set $player(value: any) {
    this.player = value;
  }
}
