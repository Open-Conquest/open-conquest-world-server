import {CreatePlayerController} from './CreatePlayerController';
import {CreatePlayerService} from './CreatePlayerService';
import {playerRepository} from '../../repos/implementations';
import {getTileForNewCityService} from '../getTileForNewCity';
import {createCityService} from '../createCity';
import {createResourcesForPlayerService} from '../createResourcesForPlayer';

const createPlayerService = new CreatePlayerService(playerRepository);

const createPlayerController = new CreatePlayerController(
    createPlayerService,
    getTileForNewCityService,
    createCityService,
    createResourcesForPlayerService,
);

export {createPlayerService, createPlayerController};
