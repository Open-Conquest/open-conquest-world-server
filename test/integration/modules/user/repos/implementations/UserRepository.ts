/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

const userFactory = new UserFactory();

describe('UserRepository:createUser', function() {
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

  it('should create a new user', async function() {
    // create a new user entity
    const username = 'test_username';
    const password = 'hashed_password32f14edfq';
    const user = userFactory.createUserWithHashedPassword(null, username, password);

    return userRepository.createUser(user)
        .then((newUser) => {
          // assert that the user returned has the expected username
          assert(newUser.getUsername().getString() === username);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('should fail with a duplicate username', async function() {
    // create a new user entity
    const username = 'test_username';
    const password = 'hashed_password32f14edfq';
    const user = userFactory.createUserWithHashedPassword(null, username, password);

    return userRepository.createUser(user)
        .then((newUser) => {
          return userRepository.createUser(user);
        })
        .then((newUser) => {
          assert.fail('User with duplicate username shouldn\'t have been created');
        })
        .catch((err) => {
          assert(err.message === 'Duplicate username error', 'Unexpceted err message: ' + err.message);
        });
  });
});
