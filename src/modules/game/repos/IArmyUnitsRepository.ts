import {Army} from '../domain/Army';
import {ArmyUnits} from '../domain/ArmyUnits';

export interface IArmyUnitsRepository {
  createArmyUnits(army: Army, armyUnits: ArmyUnits): Promise<ArmyUnits>
  getArmyUnits(army: Army): Promise<Array<ArmyUnits>>
  updateUnits(units: Array<ArmyUnits>): Promise<Array<ArmyUnits>>
}
