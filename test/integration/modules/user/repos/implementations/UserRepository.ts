/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

describe('UserRepository', function() {
  const assert = chai.assert;

  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('createNewUser should create a new user & return valiud JWT', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = 'test_password';

    return userRepository.createUser(username, password)
        .then((newUser) => {
          // assert that the user returned has the expected username
          assert(newUser.getUsername().getString() === username);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('createNewUser should fail with a duplicate username', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = '143f13edxex1x1fg43f3sdfg215g';

    return userRepository.createUser(username, password)
        .then((newUser) => {
          return userRepository.createUser(username, password);
        })
        .then((newUser) => {
          assert.fail('User with duplicate username shouldn\'t have been created');
        })
        .catch((err) => {
          assert(err.message === 'Duplicate username error', 'Unexpceted err message: ' + err.message);
        });
  });
});
