/* eslint-disable require-jsdoc */
import {Resources} from '../../../shared/schemas/Resources';

/**
 * DTO representation of Resources schema.
 *
 * @class ResourcesDTO
 * @implements {Resources}
 */
export class ResourcesDTO implements Resources {
  gold: number;

  constructor(gold: number) {
    this.gold = gold;
  }

  public get $gold(): number {
    return this.gold;
  }

  public set $gold(value: number) {
    this.gold = value;
  }
}
