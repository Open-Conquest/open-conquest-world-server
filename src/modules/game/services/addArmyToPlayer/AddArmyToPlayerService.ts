import {log} from '../../../../shared/utils/log';
import {IArmyRepository} from '../../repos/IArmyRepository';
import {IArmyUnitsRepository} from '../../repos/IArmyUnitsRepository';
import {Army} from '../../domain/Army';
import {Player} from '../../domain/Player';
import {ArmyRepositoryErrors} from '../../repos/ArmyRepositoryErrors';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {IUnitRepository} from '../../repos/IUnitRepository';
import {IPlayerRepository} from '../../repos/IPlayerRepository';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class CreateArmyService
 */
export class AddArmyToPlayerService {
  private playerRepository: IPlayerRepository;

  /**
   * Creates an instance of CreateArmyService.
   *
   * @param {IPlayerRepository} playerRepository
   * @memberof CityServices
   */
  constructor(
      playerRepository: IPlayerRepository,
  ) {
    this.playerRepository = playerRepository;
  }

  /**
   * Add the army to the player.
   *
   * @param {Army} army
   * @param {Player} player
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async addArmyToPlayer(army: Army, player: Player): Promise<Player> {
    try {
      // update player's army id in database
      return await this.playerRepository.updatePlayerArmy(player, army);
    } catch (err) {
      switch (err.message) {
        default:
          throw err;
      }
    }
  }
}
