/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {UserRepositoryErrors} from '../../../../../../src/modules/user/repos/UserRepositoryErrors';
import {Username} from '../../../../../../src/modules/user/domain/Username';

const userFactory = new UserFactory();

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of integration tests for UserRepository
 *
 * :createUser
 * 1. Should create a new user
 * 2. Should throw DuplicateUsername error
 *
 * :getPasswordWithUsername
 * 1. Should get the expected user
 * 2. Should throw NonexistentUser error
 */

describe('UserRepository:createUser', function() {
  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create a new user', async function() {
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
          expect(err.message).to.equal(UserRepositoryErrors.DuplicateUsername);
        });
  });
});

describe('UserRepository:getPasswordWithUsername', function() {
  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should get the expected user', async function() {
    // create a new user entity
    const username = 'test_username';
    const password = 'hashed_password32f14edfq';
    const user = userFactory.createUserWithHashedPassword(null, username, password);
    await userRepository.createUser(user);

    // try to get user
    const createdUser = await userRepository.getUserPasswordWithUsername(user.$username);

    // assert user has expected values
    expect(createdUser.$username.$value).to.equal(user.$username.$value);
    expect(createdUser.$hashedPassword.$value).to.equal(user.$hashedPassword.$value);
  });

  it('Should throw NonexistentUser error', async function() {
    // create a new user entity
    const usernameStr = 'nonexistent_user';
    const username = new Username(usernameStr);

    // try to get nonexistent user
    try {
      await userRepository.getUserPasswordWithUsername(username);
      assert.fail('Expected NonexistentUser error');
    } catch (err) {
      expect(err.message).to.equal(UserRepositoryErrors.NonexistentUser);
    }
  });
});
