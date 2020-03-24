/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../src/shared/utils/log';
import {models} from '../../../../src/shared/infra/sequelize/models/';
import {jwtMiddleware} from '../../../../src/shared/middleware';
import {JWT} from '../../../../src/modules/user/domain/JWT';
import {UserFactory} from '../../../../src/modules/user/factories/UserFactory';
import {User} from '../../../../src/modules/user/domain/User';
import * as jwt from 'jsonwebtoken';
import {JWTMiddlewareErrors} from '../../../../src/shared/middleware/JWTMiddleware';
import {MessageDTO} from '../../../../src/shared/dtos/MessageDTO';
import {ServiceNames} from '../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../src/shared/infra/ws/routing/ServiceOperations';
import {JWTDTO} from '../../../../src/shared/dtos/JWTDTO';
import {UserDTO} from '../../../../src/modules/user/dtos/UserDTO';

const assert = chai.assert;
const expect = chai.expect;

const userFactory = new UserFactory();

/**
 * Summary of integration tests for JWTMiddleware
 *
 * :validateJwt
 * 1. Should return the User in the JWT payload
 * 2. Should throw InvalidSignature error for JWT signed with nonsecret
 * 3. Should throw InvalidJWT error for malformed jwt string
 * 4. Should throw InvalidJWT error for empty string
 * 5. Should throw InvalidJWT error for null
 *
 * :validateMessage
 * 1. Should return a MessageDTO with an acting user
 * 2. Should throw InvalidJWT error
 *
 * :createJWT
 * 1. Should return a JWT with expected claims
 * 2. Should throw NoUserProvided error
 */

describe('JWTMiddleware:validateJWT', function() {
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

  it('Should return the User in the JWT payload', async function() {
    // create a jwt for a user to test
    const expUser: User = userFactory.createUserWithUsernameAndID(
        1,
        'test_username',
    );
    const token: JWT = jwtMiddleware.createJWT(expUser);

    // test jwt validation
    const actUser: User = jwtMiddleware.validateJwt(token);

    // assert actual user has expected values
    expect(actUser).to.deep.equal(expUser);
  });

  it('Should throw InvalidSignature error for JWT signed with nonsecret', async function() {
    // create a jwt signed with nonsecret
    const expUser: User = userFactory.createUserWithUsernameAndID(
        1,
        'test_username',
    );
    const tokenStr = jwt.sign(
        {
          username: expUser.$username.$value,
          user_id: expUser.$id.$value,
        },
        'nonsecret',
        {expiresIn: '1h'},
    );
    const token: JWT = new JWT(tokenStr);

    // assert that validation throws InvalidJWT
    try {
      jwtMiddleware.validateJwt(token);
      assert.fail('Expected InvalidSignature error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.InvalidSignature);
    }
  });

  it('Should throw InvalidJWT error for malformed string', async function() {
    // create a jwt signed with nonsecret
    const tokenStr = '213fq43fdasfgdfgsdrg43gefdgrg34trandomstring';
    const token: JWT = new JWT(tokenStr);

    // assert that validation throws InvalidJWT
    try {
      jwtMiddleware.validateJwt(token);
      assert.fail('Expected InvalidJWT error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.InvalidJWT);
    }
  });

  it('Should throw InvalidJWT error for empty string', async function() {
    // create a jwt signed with nonsecret
    const tokenStr = '';
    const token: JWT = new JWT(tokenStr);

    // assert that validation throws InvalidJWT
    try {
      jwtMiddleware.validateJwt(token);
      assert.fail('Expected InvalidJWT error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.InvalidJWT);
    }
  });

  it('Should throw InvalidJWT error for null', async function() {
    // create a jwt signed with nonsecret
    const tokenStr = null;
    const token: JWT = new JWT(tokenStr);

    // assert that validation throws InvalidJWT
    try {
      jwtMiddleware.validateJwt(token);
      assert.fail('Expected InvalidJWT error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.InvalidJWT);
    }
  });
});

describe('JWTMiddleware:validateMessage', function() {
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

  it('Should return MessageDTO with an acting user', async function() {
    // create a jwt signed with nonsecret
    const expUser: User = userFactory.createUserWithUsernameAndID(
        1,
        'test_username',
    );
    const token: JWT = jwtMiddleware.createJWT(expUser);

    // create a message with jwt
    const inMessage = new MessageDTO(
        ServiceNames.User,
        ServiceOperations.LoginUser,
        new JWTDTO(token.$token),
        null,
        null,
    );

    // try to validate message
    const outMessage: MessageDTO = jwtMiddleware.validateMessage(inMessage);

    // assert message has the expected acting user
    const actUser: UserDTO = outMessage.$user;
    expect(actUser.$username).to.equal(expUser.$username.$value);
    expect(actUser.$userID).to.equal(expUser.$id.$value);
  });

  it('Should throw NoToken error for no token', async function() {
    // create a message with null token
    const inMessage = new MessageDTO(
        ServiceNames.User,
        ServiceOperations.LoginUser,
        null,
        null,
        null,
    );

    // try to validate message
    try {
      const outMessage: MessageDTO = jwtMiddleware.validateMessage(inMessage);
      assert.fail('Expected InvalidJWT error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.NoToken);
    }
  });
});

describe('JWTMiddleware:createJWT', function() {
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

  it('Should create a valid JWT', async function() {
    // create a user
    const expUser: User = userFactory.createUserWithUsernameAndID(
        1, 'test_username',
    );

    // create token for user
    const token: JWT = jwtMiddleware.createJWT(expUser);

    // assert token is valid with expected user claims
    const actUser: User = jwtMiddleware.validateJwt(token);
    expect(actUser).to.deep.equal(expUser);
  });

  it('Should throw NoUserProvided error', async function() {
    // create token for null user
    try {
      const token: JWT = jwtMiddleware.createJWT(null);
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.NoUserProvided);
    }
  });
});
