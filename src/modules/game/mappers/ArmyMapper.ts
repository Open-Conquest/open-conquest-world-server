import {Army} from '../domain/Army';
import {ArmyFactory} from '../factories/ArmyFactory';
// import {ArmyDTO} from '../dtos/ArmyDTO';

/**
 * ArmyMapper is responsible for mappings between the domain `Army`
 * and the persistence (sequelize) representation of a army.
 */
export class ArmyMapper {
  private armyFactory: ArmyFactory

  /** Creates an instance of ArmyMapper. */
  constructor() {
    this.armyFactory = new ArmyFactory();
  }

  /**
   * Create a domain entity `Army` from a sequelize object.
   *
   * @param {*} dbArmy
   * @return {Army}
   * @memberof ArmyMapper
   */
  fromPersistence(dbArmy: any): Army {
    if (dbArmy === null) {
      return null;
    }

    return this.armyFactory.createArmy(
        dbArmy.army_id,
        dbArmy.player_id,
    );
  }
}
