import {UserRepository} from './UserRepository';
import {models} from '../../../../shared/infra/sequelize/models';

const userRepository = new UserRepository(models);

export {
  userRepository,
};
