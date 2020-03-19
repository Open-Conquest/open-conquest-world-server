import {WorldRouter} from './WorldRouter';
import {ServiceNames} from './ServiceNames';

import {userEndpoints} from '../../../../modules/user/endpoints';
import {
  playerEndpoints,
  worldEndpoints,
} from '../../../../modules/game/endpoints';

const worldRouter = new WorldRouter();

worldRouter.registerEndpoints(ServiceNames.User, userEndpoints);
worldRouter.registerEndpoints(ServiceNames.Player, playerEndpoints);
worldRouter.registerEndpoints(ServiceNames.World, worldEndpoints);

export {worldRouter};
