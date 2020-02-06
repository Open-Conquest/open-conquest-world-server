/**
 *
 *
 * @export
 * @class EntityId
 */
export class EntityId {
  private id: number;

  /**
   *Creates an instance of EntityId.
   * @param {number} id
   * @memberof EntityId
   */
  constructor(id: number) {
    this.id = id;
  }

  /**
   * Returns this entityid as a number;
   *
   * @return {number}
   * @memberof EntityId
   */
  getValue(): number {
    return this.id;
  }
}

/**
 * Baseclass for all `domain` subclasses of `Entity`.
 *
 * @export
 * @class Entity
 */
export class Entity {
  private id: EntityId;

  /**
   * Creates an instance of entity.
   *
   * @param {EntityId} id
   * @memberof Entity
   */
  constructor(id: EntityId) {
    this.id = id;
  }

  /**
   * Returns this entity's id as a number.
   *
   * @return {number}
   * @memberof Entity
   */
  getId(): number {
    return this.id.getValue();
  }

  /**
   * Check if this entity is equal to another. This method must be implemented
   * by entity subclasses.
   *
   * @param {Entity} entity
   * @memberof Entity
   */
  equals(entity: Entity): boolean {
    throw new Error('Entity subclasses must override equals(Entity)');
  }
}
