import {getPlayersService} from '../getPlayers';
import {GetMyPlayersController} from './GetMyPlayersController';

const getMyPlayersController = new GetMyPlayersController(
    getPlayersService,
);

export {getMyPlayersController};
