/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models/';
import {registerUserController} from '../../../../../../src/modules/user/services/registerUser/';
import {RegisterUserRequestDTO} from '../../../../../../src/modules/user/services/registerUser/RegisterUserRequestDTO';
import {UserCredentialsDTO} from '../../../../../../src/modules/user/dtos/UserCredentialsDTO';
import {jwtMiddleware} from '../../../../../../src/shared/middleware';
import {JWT} from '../../../../../../src/modules/user/domain/JWT';
import {RegisterUserErrors} from '../../../../../../src/modules/user/services/registerUser/RegisterUserErrors';

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of integration tests for RegisterUserController
 *
 * :registerUser
 * 1. Should return a response with a valid JWT
 * 2. Should throw UsernameTaken error
 * 3. Should throw InvalidUsername error
 * 4. Should throw InvalidPassword error
 */
describe('RegisterUserController:registerUser', function() {
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

  it('Should return a response with a valid JWT', async function() {
    // create a request dto
    const creds = new UserCredentialsDTO(
        'test_username',
        'test_password',
    );
    const request = new RegisterUserRequestDTO(
        creds,
    );

    // try to register user
    const response = await registerUserController.registerUser(request);

    // assert response contains expected username
    expect(response.username).to.equal(creds.$username);

    // assert that jwt is valid
    const token = new JWT(response.token.$value);
    const user = await jwtMiddleware.validateJwt(token);
    expect(user.$username.$value).to.equal(creds.$username);
  });

  it('Should throw UsernameTaken error', async function() {
    // register a user
    const credentials = new UserCredentialsDTO(
        'test_username',
        'test_password',
    );
    const request = new RegisterUserRequestDTO(credentials);
    await registerUserController.registerUser(request);

    // try to register user with the same username
    try {
      await registerUserController.registerUser(request);
      assert.fail('Expected UsernameTaken error');
    } catch (err) {
      expect(err.message).to.equal(RegisterUserErrors.UsernameTaken);
    }
  });

  it('Should throw InvalidUsername error', async function() {
    // register a user
    const credentials = new UserCredentialsDTO(
        '',
        'test_password',
    );
    const request = new RegisterUserRequestDTO(credentials);

    // try to register user with the same username
    try {
      await registerUserController.registerUser(request);
      assert.fail('Expected InvalidUsername error');
    } catch (err) {
      expect(err.message).to.equal(RegisterUserErrors.InvalidUsername);
    }
  });

  it('Should throw InvalidPassword error', async function() {
    // register a user with invalid password in credentials
    const credentials = new UserCredentialsDTO(
        'test_username',
        '',
    );
    const request = new RegisterUserRequestDTO(credentials);

    // try to register user with an invalid password
    try {
      await registerUserController.registerUser(request);
      assert.fail('Expected InvalidPassword error');
    } catch (err) {
      expect(err.message).to.equal(RegisterUserErrors.InvalidPassword);
    }
  });
});
