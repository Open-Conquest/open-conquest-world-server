/* eslint-disable require-jsdoc */
import {ArmyUnits} from '../domain/ArmyUnits';
import {EntityID} from '../../../shared/domain/EntityID';
import {Unit, UnitType} from '../domain/Unit';
import {UnitFactory} from './UnitFactory';

/**
 * This class is meant to handle the construction of `ArmyUnits` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of ArmyUnits.
 *
 * @class ArmyUnitsFactory
 */
export class ArmyUnitsFactory {
  private unitFactory: UnitFactory;
  /**
   * Creates an instance of ArmyUnitsFactory.
   * @memberof ArmyUnitsFactory
   */
  constructor() {
    this.unitFactory = new UnitFactory();
  }

  createArmyUnits(id: number, armyID: number, count: number, unit: Unit): ArmyUnits {
    return new ArmyUnits(
        new EntityID(id),
        new EntityID(armyID),
        count,
        unit,
    );
  }

  /**
   * Creates the default army units for a new player.
   *
   * @param {Player} player
   * @return {ArmyUnits}
   * @memberof ArmyUnitsFactory
   */
  createDefaultArmyUnits(): ArmyUnits {
    return new ArmyUnits(
        null,
        null,
        10,
        this.unitFactory.createWizard(),
    );
  }
}
