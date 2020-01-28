const log           = require('../utils/log');
const logError      = require('../utils/log').logError;
const BaseServices  = require('./BaseServices');
const models        = require('../models');

class UserServices extends BaseServices {
  constructor() {
    super();
    this.service = 'user';
    this.handlers = {
      'get': this.getUsers,
      'login': this.loginUser
    };
  }

  getUsers(request) {
    return new Promise(function (resolve, reject) {
      models.user.findAll({})
      .then(users => {
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  loginUser(request) {
    return new Promise(function (resolve, reject) {
      let username = request.username;
      models.user.findOne({
        username: username
      })
      .then(user => {
        resolve({'username': user.user_name});
        // just return username instead
        resolve(user);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}

module.exports = UserServices