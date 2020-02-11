import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {models} from '../../../src/models/';
import {userServices} from '../../../src/services';
import { Request } from '../../../src/Request';
import { ServiceNames } from '../../../src/services/ServiceNames';
import { ServiceOperations } from '../../../src/services/ServiceOperations';
const assert = chai.assert;

describe('UserServices', function() {
  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('registerUser should return a valid jwt for the new user', async function() {
    const username = 'test_username';
    const password = 'test_password';
    const data = {
      'username': username,
      'password': password,
    };

    const request = new Request(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        data,
    );

    return userServices.registerUser(request)
        .then((response) => {
          // expect the response contains jwt
          throw new Error('make sure is valid jwt');
        })
        .catch((err) => {
          // see what the error is or something
          throw err;
        });
  });

  it('registerUser should fail for a duplicate user', async function() {
    const username = 'test_username';
    const password = 'test_password';
    const data = {
      'username': username,
      'password': password,
    };

    const request = new Request(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        data,
    );

    return userServices.registerUser(request)
        .then((response) => {
          return userServices.registerUser(request);
        })
        .then((response) => {
          assert.fail('Expected username is taken error');
        })
        .catch((err) => {
          assert(err.message === 'Username is taken');
        });
  });

  it('loginUser should return a valid jwt on succeed', async function() {
    const username = 'test_username_login';
    const password = 'test_password';
    const registerData = {
      'username': username,
      'password': password,
    };
    const loginData = {
      'username': username,
      'password': 'not_the-password',
    };

    const registerRequest = new Request(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        registerData,
    );

    const loginRequest = new Request(
        ServiceNames.User,
        ServiceOperations.LoginUser,
        loginData,
    );

    return userServices.registerUser(registerRequest)
        .then((response) => {
          return userServices.loginUser(loginRequest);
        })
        .then((response) => {
          // expect jwt
          console.log(response);
        })
        .catch((err) => {
          assert(err.message === 'Username is taken');
        });
  });
});
