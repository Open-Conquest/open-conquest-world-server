import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {RegisterUserRequest} from '../../../src/services/requests/RegisterUserRequest';
import {RegisterUserResponse} from '../../../src/services/responses/RegisterUserResponse';
import {UserServices} from '../../../src/services/UserServices';
import {models} from '../../../src/models/';
import {User} from '../../../src/domain/User';
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
    // try to register a user with a new username
  });
});
