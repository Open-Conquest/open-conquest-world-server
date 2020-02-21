// CREATE WORLD SERVICES
import {WorldServices} from './WorldServices';

import {
  armyServices,
  cityServices,
  mapServices,
  marchServices,
  tileServices,
  userServices,
} from '../services';

const worldServices = new WorldServices();
worldServices.registerService(armyServices);
worldServices.registerService(cityServices);
worldServices.registerService(mapServices);
worldServices.registerService(marchServices);
worldServices.registerService(tileServices);
worldServices.registerService(userServices);

export {worldServices};
