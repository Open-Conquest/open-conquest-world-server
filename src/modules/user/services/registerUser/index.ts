import {userRepository} from '../../repos/implementations/';
import {RegisterUserService} from './RegisterUserService';
import {RegisterUserController} from './RegisterUserController';

const registerUserService = new RegisterUserService(userRepository);
const registerUserController = new RegisterUserController(registerUserService);

export {registerUserService, registerUserController};
