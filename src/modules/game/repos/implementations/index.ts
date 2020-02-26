import {CityRepository} from './CityRepository';
import {MapRepository} from './MapRepository';
import {PlayerRepository} from './PlayerRepository';
import {TileRepository} from './TileRepository';
import {models} from '../../../../shared/infra/sequelize/models';

const cityRepository = new CityRepository(models);
const mapRepository = new MapRepository(models);
const playerRepository = new PlayerRepository(models);
const tileRepository = new TileRepository(models);

export {
  cityRepository,
  mapRepository,
  playerRepository,
  tileRepository,
};
