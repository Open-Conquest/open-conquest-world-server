import {CreateMarchService} from './CreateMarchService';
import {marchRepository, tileRepository, armyRepository} from '../../repos/implementations';

const createMarchService = new CreateMarchService(
    armyRepository,
    marchRepository,
    tileRepository,
);

export {createMarchService};
