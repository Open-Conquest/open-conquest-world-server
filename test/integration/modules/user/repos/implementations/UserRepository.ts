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

import {assert, expect} from 'chai';
import * as mocha from 'mocha';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {UserRepositoryErrors} from '../../../../../../src/modules/user/repos/UserRepositoryErrors';
import {Username} from '../../../../../../src/modules/user/domain/Username';
import {User} from '../../../../../../src/modules/user/domain/User';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

const userFactory = new UserFactory();

describe('UserRepository:createUser', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create a new user', async function() {
    // create a new user entity
    const username = 'test_username';
    const password = 'hashed_password32f14edfq';
    const user = userFactory.createUserWithHashedPassword(
        null,
        username,
        password,
    );

    const createdUser = await userRepository.createUser(user);

    // assert user was created with expected values
    assert(createdUser.$username.$value === username);
  });

  it('should fail with a duplicate username', async function() {
    // create a new user entity
    const username = 'test_username';
    const password = 'hashed_password32f14edfq';
    const user = userFactory.createUserWithHashedPassword(null, username, password);

    const firstUser = await userRepository.createUser(user);

    try {
      const secondUser = await userRepository.createUser(user);
      assert.fail('User with duplicate username shouldn\'t have been created');
    } catch (err) {
      expect(err.message).to.equal(UserRepositoryErrors.DuplicateUsername);
    }
  });
});

describe('UserRepository:getPasswordWithUsername', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
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
