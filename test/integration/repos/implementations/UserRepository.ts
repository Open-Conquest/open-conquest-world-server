/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {userRepository} from '../../../../src/repos/implementations/';
import {models} from '../../../../src/models';
import {log} from '../../../../src/utils/log';

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

  it('createUser should create a new user & return expected username', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = 'password12334';

    return userRepository.createUser(username, password)
        .then((newUser) => {
          // assert that the user returned has the expected username
          assert(newUser.getUsername() === username);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('createUser should fail with a duplicate username', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = 'password12334';

    return userRepository.createUser(username, password)
        .then((newUser) => {
          return userRepository.createUser(username, password);
        })
        .then((newUser) => {
          assert.fail('User with duplicate username shouldn\'t have been created');
        })
        .catch((err) => {
          assert(err.message === 'Username is taken');
        });
  });

  it('getUserWithUsername should get expected user', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = 'test_password';
    return userRepository.createUser(username, password)
        .then((newUser) => {
          return userRepository.getUserWithUsername(username);
        })
        .then((user) => {
          assert(user.getUsername() === username);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('getUserWithUsername should fail with non-existent user', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    return userRepository.getUserWithUsername(username)
        .then((user) => {
          assert.fail('Should not have retrieved a user');
        })
        .catch((err) => {
          assert(err.message === 'No user with username: ' + username);
        });
  });

  it('getUserPasswordWithUsername should get expected user', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    const password = 'test_password';
    return userRepository.createUser(username, password)
        .then((newUser) => {
          return userRepository.getUserPasswordWithUsername(username);
        })
        .then((user) => {
          assert(user.getUsername() === username);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('getUserPasswordWithUsername should fail with non-existent user', async function() {
    // create a new user that would come in through a request
    const username = 'test_username';
    return userRepository.getUserPasswordWithUsername(username)
        .then((user) => {
          assert.fail('Should not have retrieved a user');
        })
        .catch((err) => {
          assert(err.message === 'No user with username: ' + username);
        });
  });
});
