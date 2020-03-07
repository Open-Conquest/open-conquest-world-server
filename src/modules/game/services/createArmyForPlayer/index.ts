import {CreateArmyForPlayerService} from './CreateArmyForPlayerService';
import {armyRepository, armyUnitsRepository, unitRepository} from '../../repos/implementations';

const createArmyForPlayerService = new CreateArmyForPlayerService(
    armyRepository,
    armyUnitsRepository,
    unitRepository,
);

export {createArmyForPlayerService};
