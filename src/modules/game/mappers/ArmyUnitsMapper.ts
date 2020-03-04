import {ArmyUnits} from '../domain/ArmyUnits';
import {ArmyUnitsFactory} from '../factories/ArmyUnitsFactory';
// import {ArmyUnitsDTO} from '../dtos/ArmyUnitsDTO';

/**
 * ArmyUnitsMapper is responsible for mappings between the domain `ArmyUnits`
 * and the persistence (sequelize) representation of a army.
 */
export class ArmyUnitsMapper {
  private armyFactory: ArmyUnitsFactory

  /** Creates an instance of ArmyUnitsMapper. */
  constructor() {
    this.armyFactory = new ArmyUnitsFactory();
  }

  /**
   * Create a domain entity `ArmyUnits` from a sequelize object.
   *
   * @param {*} dbArmyUnits
   * @return {ArmyUnits}
   * @memberof ArmyUnitsMapper
   */
  fromPersistence(dbArmyUnits: any): ArmyUnits {
    if (dbArmyUnits === null) {
      return null;
    }

    return this.armyFactory.createArmyUnits(
        dbArmyUnits.army_id,
        dbArmyUnits.player_id,
    );
  }
}
