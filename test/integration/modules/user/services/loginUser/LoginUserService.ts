/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserCredentials} from '../../../../../../src/modules/user/domain/UserCredentials';
import {Username} from '../../../../../../src/modules/user/domain/Username';
import {Password} from '../../../../../../src/modules/user/domain/Password';
import {JWT} from '../../../../../../src/modules/user/domain/JWT';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {jwtMiddleware} from '../../../../../../src/shared/middleware/';
import {User} from '../../../../../../src/modules/user/domain/User';
import {createTestUser} from '../../../../scripts/createTestUser';
import {loginUserService} from '../../../../../../src/modules/user/services/loginUser';
import {LoginUserErrors} from '../../../../../../src/modules/user/services/loginUser/LoginUserErrors';

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of integration tests for LoginUserService
 *
 * :loginUser
 * 1. Should return a valid JWT
 * 2. Should throw InvalidCredentials error
 */
describe('LoginUserService:loginUser', async function() {
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
    // register a user to test logging in with
    await createTestUser();

    // create credentials to try logging in as user
    const username = new Username('test_username');
    const password = new Password('test_password');
    const creds = new UserCredentials(username, password);

    // try to login with credentials
    const jwt: JWT = await loginUserService.loginUser(creds);

    // assert jwt is valid & has correct claims
    const user: User = await jwtMiddleware.validateJwt(jwt);
    expect(user.$username.$value).to.equal(username.$value);
    expect(user.$id.$value).to.equal(user.$id.$value);
  });

  it('Should throw InvalidCredentials error', async function() {
    // register a user to test logging in with
    await createTestUser();

    // create credentials to try logging in as user
    const username = new Username('test_username');
    const password = new Password('wrong_password');
    const creds = new UserCredentials(username, password);

    // try to login with credentials
    try {
      const jwt: JWT = await loginUserService.loginUser(creds);
      assert.fail('Expected InvalidCredentials error');
    } catch (err) {
      expect(err.message).to.equal(LoginUserErrors.InvalidCredentials);
    }
  });
});
