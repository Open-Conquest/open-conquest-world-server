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
import {log} from '../../../../../../src/shared/utils/log';

/**
 * These are the integration tests for RegisterUserService
 */
describe('RegisterUserService', function() {
  const assert = chai.assert;

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

  /**
   * Test registering a new user with all valid parameters
   */
  it('should return a new valid jwt when logging in with valid credentials', async function() {
    const userCredentials = new UserCredentials(
        new Username('test_username'),
        new Password('test_password'),
    );

    const jwt = await registerUserService.registerUser(userCredentials);

    const user = jwtMiddleware.validateJwt(jwt);

    assert(user.getUsername().getString() === userCredentials.getUsernameString());
  });

  /**
   * Test registering a user with a duplicate username.
   */
  it('should fail when registering a user with a duplicate username', async function() {
    const userCredentials = new UserCredentials(
        new Username('test_username'),
        new Password('test_password'),
    );

    // register first user
    const jwt = await registerUserService.registerUser(userCredentials);

    try {
      // try to register with same username
      await registerUserService.registerUser(userCredentials);
      assert.fail('Expected duplicate username error, instead execution continued');
    } catch (err) {
      console.log(err);
      assert(err.message === 'Duplicate username error', 'Expected duplicate username error in catch');
    }
  });
});
