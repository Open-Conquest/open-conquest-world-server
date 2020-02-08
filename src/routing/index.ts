// CREATE WORLD SERVICES
import {WorldServices} from 'src/routing/WorldServices';

import {
  armyServices,
  cityServices,
  mapServices,
  marchServices,
  tileServices,
  userServices,
} from 'src/services';

const worldServices = new WorldServices();
worldServices.registerService(armyServices);
worldServices.registerService(cityServices);
worldServices.registerService(mapServices);
worldServices.registerService(marchServices);
worldServices.registerService(tileServices);
worldServices.registerService(userServices);

export {worldServices};
