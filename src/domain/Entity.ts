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
   * Creates an instance of Entity.
   *
   * @param {EntityId} id
   * @memberof Entity
   */
  constructor(id: EntityId) {
    this.id = id;
  }
}
