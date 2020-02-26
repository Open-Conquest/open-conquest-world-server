/* eslint-disable require-jsdoc */
import {EntityID} from './EntityID';

/**
 * Base class for all entities.
 *
 * @export
 * @class Entity
 */
export class Entity {
  private id: EntityID;

  constructor(id: EntityID) {
    this.id = id;
  }

  getId(): EntityID {
    return this.id;
  }

  public get $id(): EntityID {
    return this.id;
  }

  public set $id(value: EntityID) {
    this.id = value;
  }
}
