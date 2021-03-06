import {ArmyUnits} from '../domain/ArmyUnits';
import {ArmyUnitsFactory} from '../factories/ArmyUnitsFactory';
import {UnitMapper} from './UnitMapper';
import { ArmyUnitsDTO } from '../dtos/ArmyUnitsDTO';
// import {ArmyUnitsDTO} from '../dtos/ArmyUnitsDTO';

/**
 * ArmyUnitsMapper is responsible for mappings between the domain `ArmyUnits`
 * and the persistence (sequelize) representation of a army.
 */
export class ArmyUnitsMapper {
  private armyUnitsFactory: ArmyUnitsFactory
  private unitMapper: UnitMapper;

  /** Creates an instance of ArmyUnitsMapper. */
  constructor() {
    this.armyUnitsFactory = new ArmyUnitsFactory();
    this.unitMapper = new UnitMapper();
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

    let unit = null;
    if (dbArmyUnits.unit !== undefined) {
      unit = this.unitMapper.fromPersistence(dbArmyUnits.unit);
    }

    return this.armyUnitsFactory.createArmyUnits(
        dbArmyUnits.army_units_id,
        dbArmyUnits.army_id,
        dbArmyUnits.unit_count,
        unit,
    );
  }

  /**
   * Map an ArmyUnitsDTO -> ArmyUnits.
   *
   * @param {ArmyUnitsDTO} armyUnits
   * @return {ArmyUnits}
   * @memberof ArmyUnitsMapper
   */
  fromDTO(armyUnits: ArmyUnitsDTO): ArmyUnits {
    const unit = this.unitMapper.fromDTO(armyUnits.$unit);
    return new ArmyUnits(
        null,
        null,
        armyUnits.$count,
        unit,
    );
  }

  /**
   * Map a domain entity to a DTO.
   *
   * @param {ArmyUnits} armyUnits
   * @return {ArmyUnitsDTO}
   * @memberof ArmyUnitsMapper
   */
  toDTO(armyUnits: ArmyUnits): ArmyUnitsDTO {
    const unitDTO = this.unitMapper.toDTO(armyUnits.$unit);
    return new ArmyUnitsDTO(
        armyUnits.$count,
        unitDTO,
    );
  }
}
