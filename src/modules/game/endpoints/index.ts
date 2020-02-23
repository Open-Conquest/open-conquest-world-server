import {PlayerEndpoints} from './PlayerEndpoints';
import {createPlayerController} from '../services/createPlayer';

const playerEndpoints = new PlayerEndpoints(createPlayerController);

export {playerEndpoints};
