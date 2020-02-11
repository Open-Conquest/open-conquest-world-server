import {BaseServices} from './BaseServices';
import {ServiceNames} from '../services/ServiceNames';
import {ServiceOperations} from '../services/ServiceOperations';
import {log} from '../utils/log';
import {IUserRepository} from '../repos/IUserRepository';
import {Request} from '../Request';
import {Response} from '../Response';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as config from '../../config/real-config';

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
      // get data from expected fields in request
      const username = request.data['username'];
      const password = request.data['password'];

      // check if username and password are valid
      if (username === null || password === null ||
          username.length < 10 || password.length < 10 ||
          username.length > 20 || password.length > 20) {
        reject(new Error('Invalid username or password'));
      }

      // hash password
      const hashedPassword = bcrypt.hashSync(password, 8);

      userRepository.createUser(username, hashedPassword)
          .then((registeredUser) => {
            // generate jwt for newly registered user
            const token = jwt.sign(
                {userId: registeredUser.getId(), username: registeredUser.getUsername()},
                config.secret,
                {expiresIn: '1h'},
            );

            // build & return response with jwt
            const response = new Response(
                ServiceNames.User,
                ServiceOperations.RegisterUser,
                token,
            );
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * Attempt to login a user.
   *
   * @param {Request} request
   * @return {Promise<Response>}
   * @memberof UserServices
   */
  loginUser(request: Request): Promise<Response> {
    const userRepository = this.userRepository;
    return new Promise(function(resolve, reject) {
      // get data from expected fields in request
      const username = request.data['username'];
      const password = request.data['password'];

      // check if username and password are valid
      if (username === null || password === null ||
        username.length < 10 || password.length < 10 ||
        username.length > 20 || password.length > 20) {
        reject(new Error('Invalid username or password'));
      }

      userRepository.getUserPasswordWithUsername(username)
          .then((user) => {
            // check to see if password matches
            if (bcrypt.compareSync(password, user.getPassword())) {
              // generate jwt for newly registered user
              const token = jwt.sign(
                  {userId: user.getId(), username: user.getUsername()},
                  config.secret,
                  {expiresIn: '1h'},
              );
              // build & return response with jwt
              const response = new Response(
                  ServiceNames.User,
                  ServiceOperations.LoginUser,
                  token,
              );
              resolve(response);
            } else {
              // error invalid login
              reject(new Error('Invalid credentials'));
            }
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
}
