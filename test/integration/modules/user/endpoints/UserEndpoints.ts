/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {RegisterUserRequestDTO} from '../../../../../src/modules/user/services/registerUser/RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from '../../../../../src/modules/user/services/registerUser/RegisterUserResponseDTO';
import {LoginUserRequestDTO} from '../../../../../src/modules/user/services/loginUser/LoginUserRequestDTO';
import {LoginUserResponseDTO} from '../../../../../src/modules/user/services/loginUser/LoginUserResponseDTO';
import {JWT} from '../../../../../src/modules/user/domain/JWT';
import {UserCredentialsDTO} from '../../../../../src/modules/user/dtos/UserCredentialsDTO';
import {jwtMiddleware} from '../../../../../src/shared/middleware';

import {userEndpoints} from '../../../../../src/modules/user/endpoints';

/**
 * These are the integration tests for the UserEndpoints registerUser endpoint
 */
describe('UserEndpoints registerUser', function() {
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
   * Test all expected successful cases for registering a user.
   */

  it('should get a RegisterUserResponseDTO with a valid jwt', async function() {
    // create message dtos for registering user
    const creds = new UserCredentialsDTO(
        'test_username',
        'test_password',
    );
    const data = new RegisterUserRequestDTO(
        creds,
    );
    const registerMessage = new MessageDTO(null, null, null, null, null);
    registerMessage.$service = ServiceNames.User;
    registerMessage.$operation = ServiceOperations.RegisterUser;
    registerMessage.$data = data;

    // register user
    const registerResponse = await userEndpoints.registerUser(registerMessage);

    // create register response dto from generic message dto
    const registerResponseDTO = RegisterUserResponseDTO.fromJSON(registerResponse.$data);

    // get jwt from register response dto
    const jwt = new JWT(registerResponseDTO.token.$value);

    // check if jwt is valid
    const user = jwtMiddleware.validateJwt(jwt);

    // assert username in jwt claims equals registered username
    assert(user.getUsername().getString() === creds.$username);
  });

  it('should do schema validation at register user endpoint', async function() {
    assert.fail('not doing schema validation on endpoints');
  });
});

describe('UserEndpoints loginUser', function() {
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
   * Test all expected successful cases for registering a user.
   */

  it('should get a LoginUserResponseDTO with a valid jwt', async function() {
    // create messages dtos for registering and logging in user
    const creds = new UserCredentialsDTO(
        'test_username',
        'test_password',
    );
    const registerData = new RegisterUserRequestDTO(
        creds,
    );
    const loginData = new LoginUserRequestDTO(
        creds,
    );
    const registerMessage = new MessageDTO(null, null, null, null, null);
    registerMessage.$service = ServiceNames.User;
    registerMessage.$operation = ServiceOperations.RegisterUser;
    registerMessage.$data = registerData.toJSON();

    const loginMessage = new MessageDTO(null, null, null, null, null);
    loginMessage.$service = ServiceNames.User;
    loginMessage.$operation = ServiceOperations.LoginUser,
    loginMessage.$data = loginData.toJSON();

    // register user
    const registerResponse = await userEndpoints.registerUser(registerMessage);

    // try to login as user
    const loginResponse = await userEndpoints.loginUser(loginMessage);

    // create login response dto from generic message dto
    const loginResponseDTO = LoginUserResponseDTO.fromJSON(loginResponse.$data);

    // get jwt from login response dto
    const jwt = new JWT(loginResponseDTO.token.$value);

    // check if jwt is valid
    const user = jwtMiddleware.validateJwt(jwt);

    // assert username in jwt claims equals username logged in with
    assert(user.getUsername().getString() === creds.$username);
  });

  it('should fail when a user hasn\'t been registered', async function() {
    const creds = new UserCredentialsDTO(
        'test_username123',
        'test_password123',
    );
    const loginData = new LoginUserRequestDTO(
        creds,
    );
    const loginMessage = new MessageDTO(null, null, null, null, null);
    loginMessage.$service = ServiceNames.User;
    loginMessage.$operation = ServiceOperations.LoginUser;
    loginMessage.$data = loginData.toJSON();

    try {
      const loginResponse = await userEndpoints.loginUser(loginMessage);
    } catch (err) {
      assert(err.message === 'Invalid login', 'Error message was: ' + err.message);
    }
  });

  it('should do schema validation at loginuser endpoint', async function() {
    assert.fail('not doing schema validation on endpoints');
  });
});
