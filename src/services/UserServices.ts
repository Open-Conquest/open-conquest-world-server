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
  registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userRepository = this.userRepository;
    return new Promise(function(resolve, reject) {

      // check that the username isn't in use
      const newUser = request.getUser();
      const username = newUser.getUsername();
      userRepository.getUserWithUsername(username)
          .then((user) => {
            if (user === null) {
              // username is not in use
              return userRepository.createUser(user);
            } else {
              // username is already taken
              reject(new Error('username is taken'));
            }
          })

          // user has been created in the database
          .then((user) => {
            /**
             *  the user was created in the database
            *   now respond with the details of the user
            *   in the future this should respond with a jwt
            *   that the user can supply with their requests
            *   in the future for autorization.
            */
           const response = new RegisterUserResponse(user);
            resolve(response);
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
