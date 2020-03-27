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
import {IArmyUnitsRepository} from '../../repos/IArmyUnitsRepository';
import {CreateArmyService} from '../createArmy/CreateArmyService';
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
  private createArmyService: CreateArmyService;

  /**
   * Creates an instance of MarchServices.
   *
   * @param {IArmyRepository} armyRepository
   * @param {IMarchRepository} marchRepository
   * @param {ITileRepository} tileRepository
   * @param {CreateArmyService} createArmyService
   * @memberof MarchServices
   */
  constructor(
      armyRepository: IArmyRepository,
      marchRepository: IMarchRepository,
      tileRepository: ITileRepository,
      createArmyService: CreateArmyService,
  ) {
    this.armyRepository = armyRepository;
    this.marchRepository = marchRepository;
    this.tileRepository = tileRepository;
    this.createArmyService = createArmyService;
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
      // get the player's main army
      const army = await this.armyRepository.getArmyForPlayer(player);
      // take the march's units from the main army
      army.split(march.$army);
      // update the main army in the databse (remove the units for the march)
      await this.armyRepository.updateArmy(army);
      // create a new army in the database for the march with the removed units
      march.$army = await this.createArmyService.createArmyWithUnits(
          march.$army, march.$army.$units,
      );
      // get start & end tile ids
      const startTile = await this.tileRepository.getTileAt(
          march.$startRow,
          march.$startCol,
      );
      const endTile = await this.tileRepository.getTileAt(
          march.$endRow,
          march.$endCol,
      );
      // create march in database with army & tiles
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
