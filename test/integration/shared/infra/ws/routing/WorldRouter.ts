/* eslint-disable max-len */
import {ServiceOperations} from '../../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {ServiceNames} from '../../../../../../src/shared/infra/ws/routing/ServiceNames';
import {MessageDTO} from '../../../../../../src/shared/dtos/MessageDTO';
import {RegisterUserRequestDTO} from '../../../../../../src/modules/user/services/registerUser/RegisterUserRequestDTO';
import {CreatePlayerRequestDTO} from '../../../../../../src/modules/game/services/createPlayer/CreatePlayerRequestDTO';
import {UserCredentialsDTO} from '../../../../../../src/modules/user/dtos/UserCredentialsDTO';
import {PlayerDTO} from '../../../../../../src/modules/game/dtos/PlayerDTO';
import {JWTDTO} from '../../../../../../src/shared/dtos/JWTDTO';
import {JWTMiddlewareErrors} from '../../../../../../src/shared/middleware/JWTMiddleware';
import {createTestWorld} from '../../../../scripts/createTestWorld';

import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import * as chai from 'chai';
import * as mocha from 'mocha';

import {worldRouter} from '../../../../../../src/shared/infra/ws/routing/';
/**
 * Summary of tests for WorldRouter:handle
 * 1. Ensure handle dispatches unauthorized messages to UserEndpoints
 * 2. Shouldn't unauthorized messages to other Endpoints
 * 3. Should dispatch authorized messages to other Endpoints
 */
describe('WorldRouter:handle', function() {
  const assert = chai.assert;
  const expect = chai.expect;

  // Start transaction before each test & rollback changes after test finishes
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1. Ensure handle dispatches unauthorized messages to UserEndpoints
  it('should dispatch unauthorized requests to UserEndpoints', async function() {
    // create expected message
    const username = 'test_username';
    const password = 'test_password';

    const credentials = new UserCredentialsDTO(null, null);
    credentials.$username = username;
    credentials.$password = password;

    const registerUserData = new RegisterUserRequestDTO(null);
    registerUserData.$credentials = credentials;

    const message = new MessageDTO(null, null, null, null, null);
    message.$service = ServiceNames.User;
    message.$operation = ServiceOperations.RegisterUser;
    message.$data = registerUserData;

    // attempt to dispatch message
    log.info('Message before being handled', message);
    const response = await worldRouter.handle(message.toJSON());

    log.info('Response received from WorldRouter', response);
    // assert that response contains expected results
    assert(response.service === ServiceNames.User, 'Unexpected service');
    assert(response.operation === ServiceOperations.RegisterUser, 'Unexpected operation');
    assert(response.data.username === username, 'Unexpected username');
    assert(response.data.token !== null, 'Unexpected token');
  });

  // 2.
  it('shouldn\'t dispatch unauthorized requests to PlayerEndpoints', async function() {
    // create expected message
    const username = 'test_username';
    const password = 'test_password';

    const credentials = new UserCredentialsDTO(null, null);
    credentials.$username = username;
    credentials.$password = password;

    const createPlayerData = new CreatePlayerRequestDTO(null);

    const message = new MessageDTO(null, null, null, null, null);
    message.$service = ServiceNames.Player;
    message.$operation = ServiceOperations.CreatePlayer;
    message.$data = createPlayerData;

    // attempt to dispatch message
    try {
      await worldRouter.handle(message.toJSON());
      assert.fail('Expected invalid token error');
    } catch (err) {
      expect(err.message).to.equal(JWTMiddlewareErrors.NoToken);
    }
  });

  // 3.
  it('should dispatch an authorized request to PlayerEndpoints', async function() {
    await createTestWorld();
    // register a new user
    const username = 'test_username';
    const password = 'test_password';

    const credentials = new UserCredentialsDTO(null, null);
    credentials.$username = username;
    credentials.$password = password;

    const registerUserData = new RegisterUserRequestDTO(null);
    registerUserData.$credentials = credentials;

    const registerMessage = new MessageDTO(null, null, null, null, null);
    registerMessage.$service = ServiceNames.User;
    registerMessage.$operation = ServiceOperations.RegisterUser;
    registerMessage.$data = registerUserData;

    // wait for new user to be registered
    const response = await worldRouter.handle(registerMessage.toJSON());

    // get token from response
    const token = response.data.token;
    const jwt = new JWTDTO(null);
    jwt.$value = token;

    // create a new player dto
    const playerName = 'new_playername';
    const player = new PlayerDTO(null);
    player.$name = playerName;

    // create a player for newly registered user
    const createPlayerData = new CreatePlayerRequestDTO(null);
    createPlayerData.$player = player;

    const message = new MessageDTO(null, null, null, null, null);
    message.$service = ServiceNames.Player;
    message.$operation = ServiceOperations.CreatePlayer;
    message.$token = token;
    message.$data = createPlayerData;

    // attempt to dispatch message
    try {
      const response = await worldRouter.handle(message.toJSON());
      assert(response.$data.player.name === playerName, 'Bad playername');
    } catch (err) {
      assert.fail('Didn\'t expect error', err.message);
    }
  });
});
