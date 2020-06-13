/* eslint-disable require-jsdoc */
import {Army} from '../../../shared/schemas/Army';
import {ArmyUnitsDTO} from './ArmyUnitsDTO';

export class ArmyDTO implements Army {
  units: ArmyUnitsDTO[]

  constructor(units: ArmyUnitsDTO[]) {
    this.units = units;
  }

  static fromJSON(json: any): ArmyDTO {
    const units = [];
    for (let i = 0; i < json['units'].length; i++) {
      const unitsJSON = json['units'][i];
      units.push(ArmyUnitsDTO.fromJSON(unitsJSON));
    }
    return new ArmyDTO(units);
  }

  public get $units(): ArmyUnitsDTO[] {
    return this.units;
  }

  public set $units(value: ArmyUnitsDTO[]) {
    this.units = value;
  }
}
