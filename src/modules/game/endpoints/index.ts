import {PlayerEndpoints} from './PlayerEndpoints';
import {createPlayerController} from '../services/createPlayer';
import {WorldEndpoints} from './WorldEndpoints';
import {getWorldController} from '../services/getWorld/';

const playerEndpoints = new PlayerEndpoints(createPlayerController);
const worldEndpoints = new WorldEndpoints(getWorldController);

export {playerEndpoints, worldEndpoints};
