/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * Domain entity representation of a army.
 *
 * @export
 * @class Army
 * @extends {Entity}
 */
export class Army extends Entity {
  private playerID: EntityID;

  /**
   * Create an instance of a army entity.
   *
   * @param {EntityID} id
   * @param {PlayerID} playerID
   * @memberof Army
   */
  constructor(id: EntityID, playerID: EntityID) {
    super(id);
    this.$playerID = playerID;
  }

  public get $playerID(): EntityID {
    return this.playerID;
  }

  public set $playerID(value: EntityID) {
    this.playerID = value;
  }
}
