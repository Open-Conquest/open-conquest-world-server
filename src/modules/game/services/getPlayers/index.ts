import {GetPlayersService} from './GetPlayersService';
import {playerRepository} from '../../repos/implementations/';

const getPlayersService = new GetPlayersService(
    playerRepository,
);

export {getPlayersService};
