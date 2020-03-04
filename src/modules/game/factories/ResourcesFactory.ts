/* eslint-disable require-jsdoc */
import {Resources} from '../domain/Resources';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * This class is meant to handle the construction of `Resources` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Resources.
 *
 * @class ResourcesFactory
 */
export class ResourcesFactory {
  /**
   * Creates an instance of ResourcesFactory.
   * @memberof ResourcesFactory
   */
  constructor() {}

  createResources(id: number, playerID: number, gold: number): Resources {
    return new Resources(
        new EntityID(id),
        new EntityID(playerID),
        gold,
    );
  }

  /**
   * Creates the default resources for a new player, which should be 100 gold.
   *
   * @param {Player} player
   * @return {Resources}
   * @memberof ResourcesFactory
   */
  createDefaultResources(): Resources {
    return new Resources(
        null,
        null,
        100,
    );
  }
}
