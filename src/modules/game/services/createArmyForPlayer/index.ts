import {CreateArmyForPlayerService} from './CreateArmyForPlayerService';
import {armyRepository} from '../../repos/implementations';

const createArmyForPlayerService = new CreateArmyForPlayerService(armyRepository);

export {createArmyForPlayerService};
