import {
  armyRepository,
  playerRepository,
} from '../../repos/implementations';
import {AddArmyToPlayerService} from './AddArmyToPlayerService';

const addArmyToPlayerService = new AddArmyToPlayerService(
    armyRepository,
    playerRepository,
);

export {addArmyToPlayerService};
