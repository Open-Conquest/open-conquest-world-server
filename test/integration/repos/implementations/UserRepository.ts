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

  it('createNewUser should create a new user & return valiud JWT', async function() {
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

  it('createNewUser should fail with a duplicate username', async function() {
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

  // it('createUser should fail with a duplicate username', async function() {
  //   // create a new user that would come in through a request
  //   const user = new User(null, 'test_username');
  //   return userRepository.createUser(user)
  //       .then((newUser) => {
  //         return userRepository.createUser(newUser);
  //       })
  //       .then((newUser) => {
  //         assert.fail('Expected SequelizeUniqueConstraintError');
  //       })
  //       .catch((err) => {
  //         assert(err.value === 'SequelizeUniqueConstraintError');
  //       });
  // });

  // it('createNewUser should fail with a empty username', async function() {
  //   throw new Error('no impl');
  // });

  // it('getUserWithUsername should get expected user', async function() {
  //   // create a new user that would come in through a request
  //   const username = 'test_username';
  //   const user = new User(null, username);
  //   return userRepository.createUser(user)
  //       .then((newUser) => {
  //         return userRepository.getUserWithUsername(username);
  //       })
  //       .then((user) => {
  //         assert(user.user_name === username);
  //       })
  //       .catch((err) => {
  //         log(err);
  //         throw err;
  //       });
  // });

  // it('getUserWithUsername should return no user', async function() {
  //   // create a new user that would come in through a request
  //   const username = 'test_username';
  //   const notusername = 'not_username';
  //   const user = new User(null, username);
  //   return userRepository.createUser(user)
  //       .then((newUser) => {
  //         return userRepository.getUserWithUsername(notusername);
  //       })
  //       .then((user) => {
  //         assert(user === null);
  //       })
  //       .catch((err) => {
  //         log(err);
  //         throw err;
  //       });
  // });
});
