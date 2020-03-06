/* eslint-disable require-jsdoc */
import {Army} from '../../../shared/schemas/Army';
import {ArmyUnitsDTO} from './ArmyUnitsDTO';

export class ArmyDTO implements Army {
  units: ArmyUnitsDTO[]

  constructor(units: ArmyUnitsDTO[]) {
    this.units = units;
  }

  public get $units(): ArmyUnitsDTO[] {
    return this.units;
  }

  public set $units(value: ArmyUnitsDTO[]) {
    this.units = value;
  }
}
