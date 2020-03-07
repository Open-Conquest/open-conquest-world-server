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
  private playerID: EntityID;
  private gold: number;

  /**
   * Create an instance of a resources entity.
   *
   * @param {EntityID} id
   * @param {PlayerID} playerID
   * @param {number} gold
   * @memberof Resources
   */
  constructor(id: EntityID, playerID: EntityID, gold: number) {
    super(id);
    this.$playerID = playerID;
    this.$gold = gold;
  }

  public get $playerID(): EntityID {
    return this.playerID;
  }

  public set $playerID(value: EntityID) {
    this.playerID = value;
  }

  public get $gold(): number {
    return this.gold;
  }

  public set $gold(value: number) {
    this.gold = value;
  }
}
