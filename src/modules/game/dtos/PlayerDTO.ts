/* eslint-disable require-jsdoc */
import {Player} from '../../../shared/schemas/Player';

/**
 * DTO representation of Player schema.
 *
 * @class PlayerDTO
 * @implements {Player}
 */
export class PlayerDTO implements Player {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public get $name(): string {
    return this.name;
  }

  public set $name(value: string) {
    this.name = value;
  }
}
