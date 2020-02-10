import {BaseServices} from './BaseServices';
import {ServiceNames} from '../services/ServiceNames';
import {ServiceOperations} from '../services/ServiceOperations';
import { log } from '../utils/log';
import { IUserRepository } from '../repos/IUserRepository';
import { Request } from '../Request';
import { Response } from '../Response';

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
   * @param {Request} request
   * @return {Promise<Response>}
   * @memberof UserServices
   */
  registerUser(request: Request): Promise<Response> {
    const userRepository = this.userRepository;
    return new Promise(function(resolve, reject) {
      // get expected data from request
      const username = request.data['username'];

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
            const response = new Response(
                ServiceNames.User,
                ServiceOperations.RegisterUser,
                user,
            );
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
