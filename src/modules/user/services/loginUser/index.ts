import {userRepository} from '../../repos/implementations/';
import {LoginUserService} from './LoginUserService';
import {LoginUserController} from './LoginUserController';

const loginUserService = new LoginUserService(userRepository);
const loginUserController = new LoginUserController(loginUserService);

export {loginUserService, loginUserController};
