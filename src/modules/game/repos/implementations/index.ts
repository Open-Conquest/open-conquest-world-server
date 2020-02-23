import {PlayerRepository} from './PlayerRepository';
import {models} from '../../../../shared/infra/sequelize/models';

const playerRepository = new PlayerRepository(models);

export {playerRepository};
