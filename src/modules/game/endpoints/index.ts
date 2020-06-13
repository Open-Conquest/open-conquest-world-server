import {PlayerEndpoints} from './PlayerEndpoints';
import {createPlayerController} from '../services/createPlayer';
import {WorldEndpoints} from './WorldEndpoints';
import {getWorldController} from '../services/getWorld/';
import {MarchEndpoints} from './MarchEndpoints';
import {createMarchController} from '../services/createMarch';

const marchEndpoints = new MarchEndpoints(createMarchController);
const playerEndpoints = new PlayerEndpoints(createPlayerController);
const worldEndpoints = new WorldEndpoints(getWorldController);

export {marchEndpoints, playerEndpoints, worldEndpoints};
