import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {RegisterUserRequest} from '../../../src/services/requests/RegisterUserRequest';
import {RegisterUserResponse} from '../../../src/services/responses/RegisterUserResponse';
import {models} from '../../../src/models/';
import { userServices } from '../../../src/services';
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
    const requestData = {
      'username': username,
      'password': password,
    };
    const request = new RegisterUserRequest(requestData);
    return userServices.registerUser(request)
        .then((response) => {
          // expect that user has the same username
          const actualUsername = response.getData().username;
          assert(actualUsername === username);
        })
        .catch((err) => {
          // see what the error is or something
          throw err;
        });
  });
});
