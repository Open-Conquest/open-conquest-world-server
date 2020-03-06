import {CityRepository} from './CityRepository';
import {MapRepository} from './MapRepository';
import {PlayerRepository} from './PlayerRepository';
import {TileRepository} from './TileRepository';
import {ResourcesRepository} from './ResourcesRepository';
import {ArmyRepository} from './ArmyRepository';
import {ArmyUnitsRepository} from './ArmyUnitsRepository';
import {models} from '../../../../shared/infra/sequelize/models';

const armyRepository = new ArmyRepository(models);
const armyUnitsRepository = new ArmyUnitsRepository(models);
const cityRepository = new CityRepository(models);
const mapRepository = new MapRepository(models);
const playerRepository = new PlayerRepository(models);
const resourcesRepository = new ResourcesRepository(models);
const tileRepository = new TileRepository(models);

export {
  armyRepository,
  armyUnitsRepository,
  cityRepository,
  mapRepository,
  playerRepository,
  resourcesRepository,
  tileRepository,
};
