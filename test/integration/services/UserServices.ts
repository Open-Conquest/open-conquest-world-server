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
          console.log(response);
        })
        .catch((err) => {
          // see what the error is or something
          throw err;
        });
  });
});
