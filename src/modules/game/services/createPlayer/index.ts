import {CreatePlayerController} from './CreatePlayerController';
import {CreatePlayerService} from './CreatePlayerService';
import {playerRepository} from '../../repos/implementations';

const createPlayerService = new CreatePlayerService(playerRepository);
const createPlayerController = new CreatePlayerController(createPlayerService);

export {createPlayerService, createPlayerController};
