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
import {loginUserService, loginUserController} from '../../../../../../src/modules/user/services/loginUser';
import {LoginUserErrors} from '../../../../../../src/modules/user/services/loginUser/LoginUserErrors';
import { LoginUserRequestDTO } from '../../../../../../src/modules/user/services/loginUser/LoginUserRequestDTO';
import { UserCredentialsDTO } from '../../../../../../src/modules/user/dtos/UserCredentialsDTO';

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of integration tests for LoginUserController
 *
 * :loginUser
 * 1. Should return a valid JWT
 * 2. Should throw InvalidCredentials error
 */
describe('LoginUserController:loginUser', async function() {
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
    const expUser = await createTestUser();

    // create login dto
    const credentialsDTO = new UserCredentialsDTO(
        expUser.$username.$value,
        'test_password',
    );
    const loginUserDTO = new LoginUserRequestDTO(credentialsDTO);

    // try to login user
    const loginRespDTO = await loginUserController.loginUser(loginUserDTO);

    // assert response has valid jwt
    const jwtDTO = loginRespDTO.token;
    const token = new JWT(jwtDTO.$value);
    const actUser = await jwtMiddleware.validateJwt(token);
    expect(actUser.$username.$value).to.equal(expUser.$username.$value);
  });

  it('Should throw InvalidCredentials error', async function() {
    // register a user to test logging in with
    const expUser = await createTestUser();

    // create login dto
    const credentialsDTO = new UserCredentialsDTO(
        expUser.$username.$value,
        'wrong_password',
    );
    const loginUserDTO = new LoginUserRequestDTO(credentialsDTO);

    // try to login user
    try {
      const loginRespDTO = await loginUserController.loginUser(loginUserDTO);
      assert.fail('Expected InvalidCredentials error');
    } catch (err) {
      expect(err.message).to.equal(LoginUserErrors.InvalidCredentials);
    }
  });
});
