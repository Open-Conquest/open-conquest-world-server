/* eslint-disable require-jsdoc */
import {Player} from '../../../shared/schemas/Player';

/**
 * DTO representation of Player schema.
 *
 * @class PlayerDTO
 * @implements {Player}
 */
export class PlayerDTO implements Player {
  playerID: number;
  name: string;

  constructor(id: number, name: string) {
    this.playerID = id;
    this.name = name;
  }

  static fromJSON(json: any): PlayerDTO {
    return new PlayerDTO(
        json['playerID'],
        json['name'],
    );
  }

  public get $name(): string {
    return this.name;
  }

  public set $name(value: string) {
    this.name = value;
  }

  public get $playerID(): number {
    return this.playerID;
  }

  public set $playerID(value: number) {
    this.playerID = value;
  }
}
