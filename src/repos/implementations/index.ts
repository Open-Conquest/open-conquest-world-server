import { ArmyRepository } from "./ArmyRepository";
import { CityRepository } from "./CityRepository";
import { MapRepository } from "./MapRepository";
import { MarchRepository } from "./MarchRepository";
import { TileRepository } from "./TileRepository";
import { UserRepository } from "./UserRepository";

import { models } from "../../models";

const armyRepository = new ArmyRepository(models);
const cityRepository = new CityRepository(models);
const mapRepository = new MapRepository(models);
const marchRepository = new MarchRepository(models);
const tileRepository = new TileRepository(models);
const userRepository = new UserRepository(models);

export {
  armyRepository,
  cityRepository,
  mapRepository,
  marchRepository,
  tileRepository,
  userRepository,
};
