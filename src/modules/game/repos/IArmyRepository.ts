import {Army} from '../domain/Army';
import {Player} from '../domain/Player';

export interface IArmyRepository {
  createArmy(player: Player, army: Army): Promise<Army>
}
