/* eslint-disable require-jsdoc */
import {EntityID} from './EntityId';

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
}
