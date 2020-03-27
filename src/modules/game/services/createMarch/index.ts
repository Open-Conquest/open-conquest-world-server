import {CreateMarchService} from './CreateMarchService';
import {marchRepository, tileRepository, armyRepository} from '../../repos/implementations';
import {createArmyService} from '../createArmy';

const createMarchService = new CreateMarchService(
    armyRepository,
    marchRepository,
    tileRepository,
    createArmyService,
);

export {createMarchService};
