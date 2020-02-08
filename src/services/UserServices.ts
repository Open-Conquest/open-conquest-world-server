import {BaseServices} from './BaseServices';
import {RegisterUserResponse} from '../services/responses/RegisterUserResponse';
import {RegisterUserRequest} from '../services/requests/RegisterUserRequest';
import {ServiceNames} from '../services/ServiceNames';
import { UserRepository } from '../repos/implementations/UserRepository';
import { log } from '../utils/log';
import { IUserRepository } from '../repos/IUserRepository';

/**
 *
 *
 * @export
 * @class UserServices
 * @extends {BaseServices}
 */
export class UserServices extends BaseServices {
  private userRepository: IUserRepository;
  /**
   * Creates an instance of UserServices.
   *
   * @param {IUserRepository} userRepository
   * @memberof UserServices
   */
  constructor(userRepository: IUserRepository) {
    super();
    // set properties for this specific service
    this.serviceName = ServiceNames.User;
    this.handlers = {
      'get': this.getUsers,
      'login': this.loginUser,
    };
    // set repos from construtor
    this.userRepository = userRepository;
  }

  /**
   * Service for handling registering a new user.
   *
   * @param {RegisterUserRequest} request
   * @return {Promise<RegisterUserResponse>}
   * @memberof UserServices
   */
  registerUser(request: RegisterUserRequest): Promise<any> {
    // what does this function need to do?
    const userRepository = this.userRepository;
    return new Promise(function(resolve, reject) {
      // need to create a json schema for this request and all the others in future
      // should get a username, password in the request
      // create a new user with username
      // use this password to create a salt... (happens inside userepo)
      const user = request.getUser();
      userRepository.createUser(user)
          .then((newUser) => {
            resolve(newUser);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @param {*} request
   * @memberof UserServices
   */
  getUsers(request) {
    throw new Error('no impl');
  }

  /**
   * @param {*} request
   * @memberof UserServices
   */
  loginUser(request) {
    throw new Error('no impl');
  }
}
