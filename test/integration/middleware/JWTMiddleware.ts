import * as chai from 'chai';
import * as mocha from 'mocha';
import {Response} from '../../../src/Response';
import {JWTMiddleware} from '../../../src/middleware/JWTMiddleware';
import {userServices} from '../../../src/services';
import {Request} from '../../../src/Request';
import {ServiceNames} from '../../../src/services/ServiceNames';
import {ServiceOperations} from '../../../src/services/ServiceOperations';
import {models} from '../../../src/models';
import {log} from '../../../src/shared/log';
import * as jwt from 'jsonwebtoken';

const jwtMiddleware = new JWTMiddleware();

describe('JWTMiddleware', function() {
  const assert = chai.assert;

  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('should accept a valid JWT', async function() {
    const username = 'test_username';
    const password = 'test_password';
    const registerUserData = {
      'username': username,
      'password': password,
    };
    const registerUserRequest = new Request(ServiceNames.User, ServiceOperations.RegisterUser, registerUserData);
    // create a jwt by registering a new user
    // return userServices.registerUser(registerUserRequest)
    //     .then((response) => {
    //       // get jwt from response
    //       const token = response.data;
    //       // create new request with token
    //       const getArmiesData = {
    //         'token': token,
    //       };
    //       const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
    //       // validate token
    //       const actualRequest = jwtMiddleware.checkJwt(getArmiesRequest);
    //       // assert response is expected
    //       assert(actualRequest.data.username === username);
    //     })
    //     .catch((err) => {
    //       assert.fail(err.message);
    //     });
  });

  it('should fail with a badly formatted JWT', async function() {
    const token = 'asdfasdf.asdfasdfasdf23f.asdf23f213';
    // create new request with badly formatted token
    const getArmiesData = {
      'token': token,
    };
    const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
    try {
      jwtMiddleware.checkJwt(getArmiesRequest);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'Access denied, invalid authorization token.');
    }
  });

  it('should fail when a JWT is not included', async function() {
    // create new request without token
    const getArmiesData = {};
    const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
    try {
      jwtMiddleware.checkJwt(getArmiesRequest);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'Expected authorization token in request');
    };
  });

  it('should fail when the request data is null', async function() {
    // create new request without token
    const getArmiesData = undefined;
    const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
    try {
      jwtMiddleware.checkJwt(getArmiesRequest);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'Expected authorization token in request');
    };
  });

  it('should fail with a JWT signed with a different secret', async function() {
    const username = 'test_username';
    const notSecret = 'not_secret';
    const token = jwt.sign(
        {username: username},
        notSecret,
        {expiresIn: '1h'},
    );
    const getArmiesData = {
      'token': token
    };
    const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
    try {
      jwtMiddleware.checkJwt(getArmiesRequest);
      assert.fail('Expected invalid jwt error');
    } catch (err) {
      log.error(err);
      assert(err.message === 'Access denied, invalid authorization token.');
    }
  });
});
