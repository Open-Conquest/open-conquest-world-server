import {CreateMarchService} from './CreateMarchService';
import {createArmyService} from '../createArmy';
import {CreateMarchController} from './CreateMarchController';
import {doesPlayerBelongToUserService} from '../doesPlayerBelongToUser';
import {
  marchRepository,
  tileRepository,
  armyRepository,
} from '../../repos/implementations';

const createMarchService = new CreateMarchService(
    armyRepository,
    marchRepository,
    tileRepository,
    createArmyService,
);

const createMarchController = new CreateMarchController(
    createMarchService,
    doesPlayerBelongToUserService,
);

export {createMarchService, createMarchController};
