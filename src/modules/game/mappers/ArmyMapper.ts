import {Army} from '../domain/Army';
import {ArmyFactory} from '../factories/ArmyFactory';
import {ArmyDTO} from '../dtos/ArmyDTO';
import {ArmyUnitsMapper} from './ArmyUnitsMapper';
import {log} from '../../../shared/utils/log';
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

    const armyUnits = [];
    if (dbArmy.army_units !== undefined) {
      for (let i = 0; i < dbArmy.army_units.length; i++) {
        armyUnits.push(
            this.armyUnitsMapper.fromPersistence(dbArmy.army_units[i]),
        );
      }
    }

    return this.armyFactory.createArmy(
        dbArmy.army_id,
        armyUnits,
    );
  }

  /**
   * Map an ArmyDTO -> Army.
   *
   * @param {ArmyDTO} armyDTO
   * @return {Army}
   * @memberof ArmyMapper
   */
  fromDTO(armyDTO: ArmyDTO): Army {
    if (armyDTO === null) {
      return null;
    }

    const armyUnits = [];
    for (let i = 0; i < armyDTO.$units.length; i++) {
      armyUnits.push(this.armyUnitsMapper.fromDTO(armyDTO.$units[i]));
    }

    return this.armyFactory.createArmy(
        null,
        armyUnits,
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
