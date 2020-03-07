import {Unit} from '../domain/Unit';
import {UnitFactory} from '../factories/UnitFactory';
import { UnitDTO } from '../dtos/UnitDTO';
// import {UnitDTO} from '../dtos/UnitDTO';

/**
 * UnitMapper is responsible for mappings between the domain `Unit`
 * and the persistence (sequelize) representation of a army.
 */
export class UnitMapper {
  private unitFactory: UnitFactory;

  /** Creates an instance of UnitMapper. */
  constructor() {
    this.unitFactory = new UnitFactory();
  }

  /**
   * Create a domain entity `Unit` from a sequelize object.
   *
   * @param {*} dbUnit
   * @return {Unit}
   * @memberof UnitMapper
   */
  fromPersistence(dbUnit: any): Unit {
    if (dbUnit === null) {
      return null;
    }

    return this.unitFactory.createUnit(
        dbUnit.unit_id,
        dbUnit.name,
        dbUnit.attack,
        dbUnit.defense,
        dbUnit.gold_cost,
    );
  }

  /**
   * Create a UnitDTO from a Unit entity.
   *
   * @param {Unit} unit
   * @return {UnitDTO}
   * @memberof UnitMapper
   */
  toDTO(unit: Unit): UnitDTO {
    return new UnitDTO(
        unit.$type,
        unit.$name,
        unit.$attack,
        unit.$defense,
        unit.$goldCost,
    );
  }
}
