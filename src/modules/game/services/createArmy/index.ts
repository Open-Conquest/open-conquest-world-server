import {CreateArmyService} from './CreateArmyService';
import {
  armyRepository,
  armyUnitsRepository,
  unitRepository,
} from '../../repos/implementations';

const createArmyService = new CreateArmyService(
    armyRepository,
    armyUnitsRepository,
    unitRepository,
);

export {createArmyService};
