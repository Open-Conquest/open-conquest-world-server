import {IMarchRepository} from '../../repos/IMarchRepository';
import {MarchRepositoryErrors} from '../../repos/MarchRepositoryErrors';
import {MarchFactory} from '../../factories/MarchFactory';
import {March} from '../../domain/March';
import {User} from '../../../../modules/user/domain/User';
import {CreateMarchErrors} from './CreateMarchErrors';
import {Player} from '../../domain/Player';
import {Army} from '../../domain/Army';
import {ITileRepository} from '../../repos/ITileRepository';
import {log} from '../../../../shared/utils/log';
import {IArmyRepository} from '../../repos/IArmyRepository';
/**
 * Coordinate between domain and persistence layers to create march entities.
 *
 * @export
 * @class MarchServices
 */
export class CreateMarchService {
  private marchRepository: IMarchRepository;
  private tileRepository: ITileRepository;
  private armyRepository: IArmyRepository;

  /**
   * Creates an instance of MarchServices.
   *
   * @param {IArmyRepository} armyRepository
   * @param {IMarchRepository} marchRepository
   * @param {ITileRepository} tileRepository
   * @memberof MarchServices
   */
  constructor(
      armyRepository: IArmyRepository,
      marchRepository: IMarchRepository,
      tileRepository: ITileRepository,
  ) {
    this.armyRepository = armyRepository;
    this.marchRepository = marchRepository;
    this.tileRepository = tileRepository;
  }

  /**
   * Create a new march for a player.
   *
   * @param {Player} player
   * @param {March} march
   * @return {Promise<Response>}
   * @memberof MarchServices
   */
  async createMarch(player: Player, march: March): Promise<March> {
    try {
      // check if player has enough units in their army to create the march
      // const playersMainArmy = await this.armyRepository.getMainArmy(player);

      // get start tile and end tile ids
      const startTile = await this.tileRepository.getTileAt(
          march.$startRow,
          march.$startCol,
      );
      const endTile = await this.tileRepository.getTileAt(
          march.$endRow,
          march.$endCol,
      );

      return await this.marchRepository.createMarch(
          march,
          startTile,
          endTile,
      );
    } catch (err) {
      switch (err.message) {
        default:
          throw err;
      }
    }
  }
}
