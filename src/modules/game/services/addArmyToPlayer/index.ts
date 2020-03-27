import {
  playerRepository,
} from '../../repos/implementations';
import {AddArmyToPlayerService} from './AddArmyToPlayerService';

const addArmyToPlayerService = new AddArmyToPlayerService(
    playerRepository,
);

export {addArmyToPlayerService};
