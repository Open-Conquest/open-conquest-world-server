import {Army} from '../domain/Army';

export interface IArmyRepository {
  save(): Promise<Army>
  getAllArmies(): Promise<Array<Army>>
}
