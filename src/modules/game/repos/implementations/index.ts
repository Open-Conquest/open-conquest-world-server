import {PlayerRepository} from './PlayerRepository';
import {CityRepository} from './CityRepository';
import {models} from '../../../../shared/infra/sequelize/models';

const cityRepository = new CityRepository(models);
const playerRepository = new PlayerRepository(models);

export {
  cityRepository,
  playerRepository,
};
