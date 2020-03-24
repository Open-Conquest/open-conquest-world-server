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
 * Summary of tests for UserEndpoints:registerUser
 * 1. Should get a RegisterUserReponse with a valid jwt
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

  // 1.
  it('should get a RegisterUserResponseDTO with a valid jwt', async function() {
    // create message dtos for registering user
    const creds = new UserCredentialsDTO(
        'test_username',
        'test_password',
    );
    const data = new RegisterUserRequestDTO(
        creds,
    );
    const registerMessage = new MessageDTO(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        null,
        null,
        data,
    );
    log.info(registerMessage);
    // register user
    const registerResponse = await userEndpoints.registerUser(registerMessage);

    // create register response dto from generic message dto
    const registerResponseDTO = RegisterUserResponseDTO.fromJSON(registerResponse.$data);

    // get jwt from register response dto
    const jwt = new JWT(registerResponseDTO.token.$value);
    log.info(jwt);

    // check if jwt is valid
    const user = jwtMiddleware.validateJwt(jwt);
    log.info(user);

    // assert username in jwt claims equals registered username
    assert(user.$username.$value === creds.$username);
  });
});

/**
 * Summary of tests for UserEndpoints:loginUser
 * 1. Should get a LoginUserReponstDTO with a valid jwt
 * 2. Should get an error for a nonexistent user
 */
describe('UserEndpoints:loginUser', function() {
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

  // 1.
  it('Should get a LoginUserReponstDTO with a valid jwt', async function() {
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
    assert(user.$username.$value === creds.$username);
  });

  // 2.
  it('Should get an error for a nonexistent user', async function() {
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
});
