import {log} from '../utils/log';
import {logError as logError} from '../utils/log';
import {BaseServices} from './BaseServices';
import {models} from '../models';

export class UserServices extends BaseServices {
  constructor() {
    super();
    this.service = 'user';
    this.handlers = {
      'get': this.getUsers,
      'login': this.loginUser,
    };
  }

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
