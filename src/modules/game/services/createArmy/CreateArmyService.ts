import {CreateArmyErrors} from './CreateArmyErrors';
import {log} from '../../../../shared/utils/log';
import {IArmyRepository} from '../../repos/IArmyRepository';
import {IArmyUnitsRepository} from '../../repos/IArmyUnitsRepository';
import {Army} from '../../domain/Army';
import {Player} from '../../domain/Player';
import {ArmyRepositoryErrors} from '../../repos/ArmyRepositoryErrors';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {IUnitRepository} from '../../repos/IUnitRepository';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class CreateArmyService
 */
export class CreateArmyService {
  private armyRepository: IArmyRepository;
  private armyUnitsRepository: IArmyUnitsRepository;
  private unitRepository: IUnitRepository;

  /**
   * Creates an instance of CreateArmyService.
   *
   * @param {IArmyRepository} armyRepository
   * @param {IArmyUnitsRepository} armyUnitsRepository
   * @param {IUnitRepository} unitRepository
   * @memberof CityServices
   */
  constructor(
      armyRepository: IArmyRepository,
      armyUnitsRepository: IArmyUnitsRepository,
      unitRepository: IUnitRepository,
  ) {
    this.armyRepository = armyRepository;
    this.armyUnitsRepository = armyUnitsRepository;
    this.unitRepository = unitRepository;
  }

  /**
   * Create a new empty army for a player.
   *
   * @param {Army} army
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async createArmy(army: Army): Promise<Army> {
    try {
      return await this.armyRepository.createArmy(army);
    } catch (err) {
      switch (err.message) {
        default:
          throw err;
      }
    }
  }

  /**
   * Create a new army and create the units that should be added to it in the
   * database as well. Return an army entity with units included.
   *
   * @param {Army} army
   * @param {Array<ArmyUnits>} units
   * @return {Promise<Army>}
   * @memberof CreateArmyService
   */
  async createArmyWithUnits(
      army: Army, units: Array<ArmyUnits>,
  ): Promise<Army> {
    try {
      // create army in database
      const createdArmy = await this.armyRepository.createArmy(army);

      // create an entry for each set of units in the database
      const createdUnits = [];
      for (let i = 0; i < units.length; i++) {
        // save this set of units to the database
        const theseUnits = units[i];
        const theseCreatedUnits = await this.armyUnitsRepository.createArmyUnits(
            createdArmy, theseUnits,
        );
        // get the type of units that were added
        const theseUnitsType = await this.unitRepository.getUnit(theseUnits.$unit);
        theseCreatedUnits.$unit = theseUnitsType;
        // add this set of units with their stats to the created units list
        createdUnits.push(theseCreatedUnits);
      }
      // add all of the created units to the army
      createdArmy.$units = createdUnits;

      // return the newly created army with its units property now initialized
      return createdArmy;
    } catch (err) {
      switch (err.message) {
        default:
          throw err;
      }
    }
  }
}
