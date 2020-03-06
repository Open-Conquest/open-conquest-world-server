import {Unit} from '../domain/Unit';

export interface IUnitRepository {
  getUnit(unit: Unit): Promise<Unit>
}
