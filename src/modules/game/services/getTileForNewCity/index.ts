import {GetTileForNewCityService} from './GetTileForNewCityService';
import {tileRepository} from '../../repos/implementations';

const getTileForNewCityService = new GetTileForNewCityService(tileRepository);

export {getTileForNewCityService};
