/* eslint-disable require-jsdoc */
import {Army} from '../domain/Army';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * This class is meant to handle the construction of `Army` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Army.
 *
 * @class ArmyFactory
 */
export class ArmyFactory {
  /**
   * Creates an instance of ArmyFactory.
   * @memberof ArmyFactory
   */
  constructor() {}

  createArmy(id: number, playerID: number): Army {
    return new Army(
        new EntityID(id),
        new EntityID(playerID),
    );
  }

  /**
   * Creates the default army for a new player.
   *
   * @param {Player} player
   * @return {Army}
   * @memberof ArmyFactory
   */
  createDefaultArmy(): Army {
    return new Army(
        null,
        null,
    );
  }
}
