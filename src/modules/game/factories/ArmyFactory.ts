/* eslint-disable require-jsdoc */
import {Army} from '../domain/Army';
import {EntityID} from '../../../shared/domain/EntityID';
import {ArmyUnits} from '../domain/ArmyUnits';
import {Unit} from '../domain/Unit';
import {UnitFactory} from './UnitFactory';
import {ArmyUnitsFactory} from './ArmyUnitsFactory';

/**
 * This class is meant to handle the construction of `Army` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Army.
 *
 * @class ArmyFactory
 */
export class ArmyFactory {
  private unitFactory: UnitFactory;
  private armyUnitsFactory: ArmyUnitsFactory;

  /**
   * Creates an instance of ArmyFactory.
   * @memberof ArmyFactory
   */
  constructor() {
    this.unitFactory = new UnitFactory();
    this.armyUnitsFactory = new ArmyUnitsFactory();
  }

  createArmy(id: number, playerID: number, units: Array<ArmyUnits>): Army {
    return new Army(
        new EntityID(id),
        new EntityID(playerID),
        units,
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
        null,
    );
  }

  /**
   * Creates the default army for a new player with 10 wizards.
   *
   * @param {Player} player
   * @return {Army}
   * @memberof ArmyFactory
   */
  createDefaultArmyWithUnits(): Army {
    const wizard = this.unitFactory.createWizard();

    const wizards = this.armyUnitsFactory.createArmyUnits(
        null,
        null,
        10,
        wizard,
    );

    const units = [];
    units.push(wizards);

    return new Army(null, null, units);
  }
}
