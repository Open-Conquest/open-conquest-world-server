import {IMarchRepository} from '../../repos/IMarchRepository';
import {MarchRepositoryErrors} from '../../repos/MarchRepositoryErrors';
import {MarchFactory} from '../../factories/MarchFactory';
import {March} from '../../domain/March';
import {User} from '../../../../modules/user/domain/User';
import {CreateMarchErrors} from './CreateMarchErrors';
import {Player} from '../../domain/Player';
import {Army, ArmyErrors} from '../../domain/Army';
import {ITileRepository} from '../../repos/ITileRepository';
import {log} from '../../../../shared/utils/log';
import {IArmyRepository} from '../../repos/IArmyRepository';
import {IArmyUnitsRepository} from '../../repos/IArmyUnitsRepository';
import {CreateArmyService} from '../createArmy/CreateArmyService';
import {TileRepositoryErrors} from '../../repos/TileRepositoryErrors';
import {ArmyRepositoryErrors} from '../../repos/ArmyRepositoryErrors';
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
      // get the player's army
      player.$army = await this.armyRepository.getArmyForPlayer(player);
      // take the march's units from the player's army
      player.$army.split(march.$army);
      // update the player's army in the db (remove the units for the march)
      await this.armyRepository.updateArmy(player.$army);
      // create a new army in the db for the march's army
      march.$army = await this.createArmyService.createArmyWithUnits(
          march.$army, march.$army.$units,
      );
      // get start & end tile ids from database
      const startTile = await this.tileRepository.getTileAt(
          march.$startRow,
          march.$startCol,
      );
      const endTile = await this.tileRepository.getTileAt(
          march.$endRow,
          march.$endCol,
      );
      // create a march entry in database with the army & tiles
      return await this.marchRepository.createMarch(
          march,
          startTile,
          endTile,
      );
    } catch (err) {
      switch (err.message) {
        case ArmyErrors.InsufficientUnits:
          throw new Error(CreateMarchErrors.InsufficientUnits);
        case TileRepositoryErrors.NonexistentTile:
          throw new Error(CreateMarchErrors.NonexistentTile);
        case ArmyRepositoryErrors.NonexistentPlayer:
          throw new Error(CreateMarchErrors.NonexistentPlayer);
        default:
          throw err;
      }
    }
  }
}
