/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * Domain entity representation of a resources.
 *
 * @export
 * @class Resources
 * @extends {Entity}
 */
export class Resources extends Entity {
  private gold: number;

  /**
   * Create an instance of a resources entity.
   *
   * @param {EntityID} id
   * @param {number} gold
   * @memberof Resources
   */
  constructor(id: EntityID, gold: number) {
    super(id);
    this.$gold = gold;
  }

  public get $gold(): number {
    return this.gold;
  }

  public set $gold(value: number) {
    this.gold = value;
  }
}
