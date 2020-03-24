/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserCredentials} from '../../../../../../src/modules/user/domain/UserCredentials';
import {Username} from '../../../../../../src/modules/user/domain/Username';
import {Password} from '../../../../../../src/modules/user/domain/Password';
import {JWT} from '../../../../../../src/modules/user/domain/JWT';
import {registerUserService} from '../../../../../../src/modules/user/services/registerUser/';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {jwtMiddleware} from '../../../../../../src/shared/middleware/';
import {User} from '../../../../../../src/modules/user/domain/User';
import {RegisterUserErrors} from '../../../../../../src/modules/user/services/registerUser/RegisterUserErrors';

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of integration tests for RegisterUserService
 *
 * :registerUser
 * 1. Should return a valid JWT
 * 2. Should throw UsernameTaken error
 */
describe('RegisterUserService:registerUser', async function() {
  /**
   * Start a transaction before each test then rollback any changes after
   * the test finishes running. This ensure that no changes made to the
   * database during the tests are kept.
   */
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should return a valid JWT', async function() {
    // create credentials for new user: test_username
    const userCredentials = new UserCredentials(
        new Username('test_username'),
        new Password('test_password'),
    );

    // try to register user with credentials (username, password)
    const jwt: JWT = await registerUserService.registerUser(userCredentials);

    // check to see if jwt is valid
    const user: User = jwtMiddleware.validateJwt(jwt);
    assert(user.$username.$value === userCredentials.$username.$value);
  });

  it('Should throw UsernameTaken error', async function() {
    // register user with username: test_username
    const userCredentials = new UserCredentials(
        new Username('test_username'),
        new Password('test_password'),
    );
    await registerUserService.registerUser(userCredentials);

    // try to register another user with the same username
    try {
      await registerUserService.registerUser(userCredentials);
      assert.fail('Expected UsernameTaken error');
    } catch (err) {
      expect(err.message).to.equal(RegisterUserErrors.UsernameTaken);
    }
  });
});
