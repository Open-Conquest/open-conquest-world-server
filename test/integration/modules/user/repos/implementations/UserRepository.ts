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
  let t = null;
  beforeEach(async () => {
    t = await connection.transaction();
  });
  // Rollback any database changes made during a test
  afterEach(async () => {
    await t.rollback();
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

    const createdUser = await userRepository.testcreateUser(user, t);

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

// eslint-disable-next-line require-jsdoc
export function logMethod(
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
  // target === Employee.prototype
  // propertyName === "greet"
  // propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "greet")
  const method = propertyDesciptor.value;

  propertyDesciptor.value = function(...args: any[]) {
    // convert list of greet arguments to string
    const params = args.map((a) => JSON.stringify(a)).join();

    // invoke greet() and get its return value
    const result = method.apply(this, args);

    // convert result to string
    const r = JSON.stringify(result);

    // display in console the function call details
    console.log(`Call: ${propertyName}(${params}) => ${r}`);

    // return the result of invoking the method
    return result;
  };
  return propertyDesciptor;
};

class Employee {
  constructor(
      private firstName: string,
      private lastName: string,
  ) {
  }

  @logMethod
  greet(message: string): string {
    return `${this.firstName} ${this.lastName} says: ${message}`;
  }
}

const emp = new Employee('Mohan Ram', 'Ratnakumar');
emp.greet('hello');


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
