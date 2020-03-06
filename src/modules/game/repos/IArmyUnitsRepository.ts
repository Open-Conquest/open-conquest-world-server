import {Army} from '../domain/Army';
import {ArmyUnits} from '../domain/ArmyUnits';

export interface IArmyRepository {
  createArmyUnits(army: Army, armyUnits: ArmyUnits): Promise<ArmyUnits>
  getArmyUnits(army: Army): Promise<Array<ArmyUnits>>
}
