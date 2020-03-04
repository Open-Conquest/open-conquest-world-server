import {CreatePlayerController} from './CreatePlayerController';
import {CreatePlayerService} from './CreatePlayerService';
import {playerRepository} from '../../repos/implementations';
import {getTileForNewCityService} from '../getTileForNewCity';

const createPlayerService = new CreatePlayerService(playerRepository);
const createPlayerController = new CreatePlayerController(
    createPlayerService,
    getTileForNewCityService,
);

export {createPlayerService, createPlayerController};
