import {BaseServices} from './BaseServices';
import {RegisterUserResponse} from './responses/RegisterUserResponse';
import {RegisterUserRequest} from './requests/RegisterUserRequest';
import {ServiceNames} from './ServiceNames';

/**
 *
 *
 * @export
 * @class UserServices
 * @extends {BaseServices}
 */
export class UserServices extends BaseServices {
  /**
   *Creates an instance of UserServices.
   * @memberof UserServices
   */
  constructor() {
    super();
    this.serviceName = ServiceNames.User;
    this.handlers = {
      'get': this.getUsers,
      'login': this.loginUser,
    };
  }

  /**
   * Service for handling registering a new user.
   *
   * @param {RegisterUserRequest} request
   * @return {Promise<RegisterUserResponse>}
   * @memberof UserServices
   */
  registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    // what does this function need to do?
    return new Promise(function(resolve, reject) {

    });
  }

  /**
   *
   *
   * @param {*} request
   * @memberof UserServices
   */
  getUsers(request) {
    // return new Promise(function(resolve, reject) {
    //   models.user.findAll({})
    //       .then((users) => {
    //         resolve(users);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }

  /**
   *
   *
   * @param {*} request
   * @memberof UserServices
   */
  loginUser(request) {
    // return new Promise(function(resolve, reject) {
    //   const username = request.username;
    //   models.user.findOne({
    //     username: username,
    //   })
    //       .then((user) => {
    //         resolve({'username': user.user_name});
    //         // just return username instead
    //         resolve(user);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    // });
  }
}
