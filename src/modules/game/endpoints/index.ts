import {PlayerEndpoints} from './PlayerEndpoints';
import {createPlayerController} from '../services/createPlayer';
import {WorldEndpoints} from './WorldEndpoints';
import {getWorldController} from '../services/getWorld/';
import {MarchEndpoints} from './MarchEndpoints';
import {createMarchController} from '../services/createMarch';
import {getMyPlayersController} from '../services/getMyPlayers';

const marchEndpoints = new MarchEndpoints(createMarchController);
const worldEndpoints = new WorldEndpoints(getWorldController);
const playerEndpoints = new PlayerEndpoints(
    createPlayerController,
    getMyPlayersController,
);

export {marchEndpoints, playerEndpoints, worldEndpoints};
