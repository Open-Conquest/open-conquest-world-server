/* eslint-disable require-jsdoc */
import {ArmyUnits} from '../../../shared/schemas/ArmyUnits';
import {UnitDTO} from './UnitDTO';

export class ArmyUnitsDTO implements ArmyUnits {
  count: number;
  unit: UnitDTO;

  constructor(count: number, unit: UnitDTO) {
    this.count = count;
    this.unit = unit;
  }

  public get $count(): number {
    return this.count;
  }

  public get $unit(): UnitDTO {
    return this.unit;
  }

  public set $count(value: number) {
    this.count = value;
  }

  public set $unit(value: UnitDTO) {
    this.unit = value;
  }
}
