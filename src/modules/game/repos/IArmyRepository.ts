import {Army} from '../domain/Army';
import {Player} from '../domain/Player';

export interface IArmyRepository {
  createArmy(army: Army): Promise<Army>
  updateArmy(army: Army)
  getArmyForPlayer(player: Player): Promise<Army>
}
