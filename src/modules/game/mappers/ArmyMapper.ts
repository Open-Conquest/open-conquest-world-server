import {Army} from '../domain/Army';
import {ArmyFactory} from '../factories/ArmyFactory';
import { ArmyDTO } from '../dtos/ArmyDTO';
import { ArmyUnitsMapper } from './ArmyUnitsMapper';
// import {ArmyDTO} from '../dtos/ArmyDTO';

/**
 * ArmyMapper is responsible for mappings between the domain `Army`
 * and the persistence (sequelize) representation of a army.
 */
export class ArmyMapper {
  private armyFactory: ArmyFactory;
  private armyUnitsMapper: ArmyUnitsMapper;

  /** Creates an instance of ArmyMapper. */
  constructor() {
    this.armyFactory = new ArmyFactory();
    this.armyUnitsMapper = new ArmyUnitsMapper();
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
        null,
    );
  }

  /**
   * Create a dto from a army entity.
   *
   * @param {Army} army
   * @return {ArmyDTO}
   * @memberof ArmyMapper
   */
  toDTO(army: Army): ArmyDTO {
    // convert all army units in list to dtos
    const armyUnitsDTOs = [];
    for (let i = 0; i < army.$units.length; i++) {
      const armyUnits = army.$units[i];
      const armyUnitsDTO = this.armyUnitsMapper.toDTO(armyUnits);
      armyUnitsDTOs.push(armyUnitsDTO);
    }
    return new ArmyDTO(armyUnitsDTOs);
  }
}
