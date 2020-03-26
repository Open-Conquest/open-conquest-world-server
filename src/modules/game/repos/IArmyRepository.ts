import {Army} from '../domain/Army';

export interface IArmyRepository {
  createArmy(army: Army): Promise<Army>
}
