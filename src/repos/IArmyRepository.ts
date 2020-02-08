import {Army} from '../domain/Army';
import { User } from 'src/domain/User';

export interface IArmyRepository {
  getAllArmies(user: User): Promise<Array<Army>>
  createArmy(user: User, army: Army): Promise<any>
  createEmptyArmy(user: User): Promise<Army>
}
