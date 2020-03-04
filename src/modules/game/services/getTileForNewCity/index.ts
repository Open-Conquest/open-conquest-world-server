import {GetTileForNewCityService} from './GetTileForNewCityService';

import {tileRepository, mapRepository} from '../../repos/implementations';

const getTileForNewCityService = new GetTileForNewCityService(
    tileRepository,
    mapRepository,
);

export {getTileForNewCityService};
