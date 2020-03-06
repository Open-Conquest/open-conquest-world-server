import {CreateArmyForPlayerServiceErrors} from './CreateArmyForPlayerErrors';
import {log} from '../../../../shared/utils/log';
import {IArmyRepository} from '../../repos/IArmyRepository';
import {Army} from '../../domain/Army';
import {Player} from '../../domain/Player';
import {ArmyRepositoryErrors} from '../../repos/ArmyRepositoryErrors';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class CreateArmyForPlayerService
 */
export class CreateArmyForPlayerService {
  private armyRepository: IArmyRepository;

  /**
   * Creates an instance of CreateArmyForPlayerService.
   *
   * @param {IArmyRepository} armyRepository
   * @memberof CityServices
   */
  constructor(armyRepository: IArmyRepository) {
    this.armyRepository = armyRepository;
  }

  /**
   * Get the best tile to create a city for a new player at.
   *
   * @param {Player} player
   * @param {Army} army
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async createArmy(player: Player, army: Army): Promise<Army> {
    try {
      return await this.armyRepository.createArmy(player, army);
    } catch (err) {
      switch (err.message) {
        case ArmyRepositoryErrors.NonexistentPlayer:
          // there are some errors that we know
          throw new Error(CreateArmyForPlayerErrors.NonexistentPlayer);
        default:
          throw err;
      }
    }
  }
}
