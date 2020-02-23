/* eslint-disable require-jsdoc */

/**
 * Value object meant to represent the unique id for an entity. This id's value
 * does correspond to the id's value of the entity in the database.
 *
 * @export
 * @class EntityID
 */
export class EntityID {
  private value: number;

  constructor(entityID: number) {
    this.value = entityID;
  }

  getValue(): number {
    return this.value;
  }
}
