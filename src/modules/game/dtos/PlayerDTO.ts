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
}
