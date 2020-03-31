/* eslint-disable require-jsdoc */
import {CreateMarchRequest} from '../../../../shared/schemas/CreateMarchRequest';
import {PlayerDTO} from '../../dtos/PlayerDTO';
import {MarchDTO} from '../../dtos/MarchDTO';

export class CreateMarchRequestDTO implements CreateMarchRequest {
  player: PlayerDTO;
  march: MarchDTO;

  constructor($player: PlayerDTO, $march: MarchDTO) {
    this.player = $player;
    this.march = $march;
  }

  static fromJSON(json: any): CreateMarchRequestDTO {
    const player = PlayerDTO.fromJSON(json['player']);
    const march = MarchDTO.fromJSON(json['march']);
    return new CreateMarchRequestDTO(
        player,
        march,
    );
  }

  public get $player(): PlayerDTO {
    return this.player;
  }

  public get $march(): MarchDTO {
    return this.march;
  }

  public set $player(value: PlayerDTO) {
    this.player = value;
  }

  public set $march(value: MarchDTO) {
    this.march = value;
  }
}
