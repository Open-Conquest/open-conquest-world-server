import {CreatePlayerController} from './CreatePlayerController';
import {CreatePlayerService} from './CreatePlayerService';
import {playerRepository} from '../../repos/implementations';
import {getTileForNewCityService} from '../getTileForNewCity';
import {createCityService} from '../createCity';
import {createResourcesForPlayerService} from '../createResourcesForPlayer';
import {createArmyService} from '../createArmy';
import {addArmyToPlayerService} from '../addArmyToPlayer';

const createPlayerService = new CreatePlayerService(playerRepository);

const createPlayerController = new CreatePlayerController(
    createPlayerService,
    getTileForNewCityService,
    createCityService,
    createResourcesForPlayerService,
    createArmyService,
    addArmyToPlayerService,
);

export {createPlayerService, createPlayerController};
