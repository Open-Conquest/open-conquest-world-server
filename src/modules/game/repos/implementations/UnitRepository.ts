/* eslint-disable require-jsdoc */
import {IUnitRepository} from '../IUnitRepository';
import {Unit} from '../../domain/Unit';
import {Army} from '../../domain/Army';
import {UnitMapper} from '../../mappers/UnitMapper';
import {log} from '../../../../shared/utils/log';
/**
 * Repository implementation for armyunits entities.
 *
 * @export
 * @class UnitRepository
 * @implements {IUnitRepository}
 */
export class UnitRepository implements IUnitRepository {
  private models: any;
  private unitMapper: UnitMapper;

  /**
   * Creates an instance of UnitRepository.
   *
   * @param {*} models
   * @memberof UnitRepository
   */
  constructor(models: any) {
    this.models = models;
    this.unitMapper = new UnitMapper();
  }

  /**
   * Get a unit,
   *
   * @param {Unit} unit
   * @return {Promise<Array<Unit>>}
   * @memberof UnitRepository
   */
  async getUnit(unit: Unit): Promise<Unit> {
    const dbUnit = await this.models.unit.findOne({
      where: {
        unit_id: unit.$type,
      },
    });
    return this.unitMapper.fromPersistence(dbUnit);
  }
}
