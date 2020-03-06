/* eslint-disable require-jsdoc */
import {Unit, UnitName} from '../domain/Unit';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * This class is meant to handle the construction of `Unit` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Unit.
 *
 * @class UnitFactory
 */
export class UnitFactory {
  /**
   * Creates an instance of UnitFactory.
   * @memberof UnitFactory
   */
  constructor() {}

  createUnit(type: number, name: string, attack: number, defense: number, goldCost: number): Unit {
    return new Unit(
        type,
        UnitName[name],
        attack,
        defense,
        goldCost,
    );
  }
}
