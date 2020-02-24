/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityId';
import {Playername} from './Playername';

/**
 * Domain entity representation of a Player.
 *
 * @export
 * @class Player
 */
export class Player extends Entity {
  private name: Playername;

  constructor(id: EntityID, name: Playername) {
    super(id);
    this.name = name;
  }

  getNameString(): string {
    return this.name.getString();
  }

  public get $name(): Playername {
    return this.name;
  }

  public set $name(value: Playername) {
    this.name = value;
  }

}
