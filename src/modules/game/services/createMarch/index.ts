import {CreateMarchService} from './CreateMarchService';
import {marchRepository, tileRepository, armyRepository} from '../../repos/implementations';
import {createArmyService} from '../createArmy';
import {CreateMarchController} from './CreateMarchController';

const createMarchService = new CreateMarchService(
    armyRepository,
    marchRepository,
    tileRepository,
    createArmyService,
);

const createMarchController = new CreateMarchController(
    createMarchService,
);

export {createMarchService, createMarchController};
