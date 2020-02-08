import { BaseServices } from "./BaseServices";
import { ArmyServices } from "./ArmyServices";
import { CityServices } from "./CityServices";
import { MapServices } from "./MapServices";
import { MarchServices } from "./MarchServices";
import { UserServices } from "./UserServices";
import { TileServices } from "./TileServices";

import { armyRepository } from "../repos/implementations";
import { cityRepository } from "../repos/implementations";
import { mapRepository } from "../repos/implementations";
import { marchRepository } from "../repos/implementations";
import { tileRepository } from "../repos/implementations";
import { userRepository } from "../repos/implementations";

const armyServices = new ArmyServices(armyRepository);
const cityServices = new CityServices(cityRepository);
const mapServices = new MapServices(mapRepository);
const marchServices = new MarchServices(marchRepository);
const tileServices = new TileServices(tileRepository);
const userServices = new UserServices(userRepository);

export {
  armyServices,
  cityServices,
  mapServices,
  marchServices,
  tileServices,
  userServices,
};
