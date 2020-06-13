/* eslint-disable max-len */
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {Playername} from '../../../../../../src/modules/game/domain/Playername';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {CreatePlayerErrors} from '../../../../../../src/modules/game/services/createPlayer/CreatePlayerErrors';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

import {createPlayerService} from '../../../../../../src/modules/game/services/createPlayer';

/**
 * Summary of tests for CreatePlayerService
 *
 * :createPlayer
 * 1. Should create a new player for an existing user
 * 2. Should throw DuplicatePlayername error
 * 3. Should throw NonexistentUser error
 */

describe('CreatePlayerService:createPlayer', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  const userFactory = new UserFactory();
  const playerFactory = new PlayerFactory();

  // 1. Should create a new player for an existing user
  it('Should create a new player for an existing user', async function() {
    // register a new player to create the player for
    const username = 'test_username';
    const hashedPassword = 'q1f8923hfkdjhf2ir3r';
    const newUser = userFactory.createUserWithHashedPassword(
        null,
        username,
        hashedPassword,
    );
    const user = await userRepository.createUser(newUser);

    // create a new player through service
    const name = 'test_playername';
    const player = playerFactory.createPlayerWithName(name);
    const createdPlayer = await createPlayerService.createPlayer(user, player);

    assert(createdPlayer.getNameString() === name);
  });

  // 2.
  it('Should throw DuplicatePlayername error', async function() {
    // register a new player to create the player for
    const username = 'test_username';
    const hashedPassword = 'q1f8923hfkdjhf2ir3r';
    const newUser = userFactory.createUserWithHashedPassword(
        null,
        username,
        hashedPassword,
    );
    const user = await userRepository.createUser(newUser);

    // create a new player through service
    const name = 'test_playername';
    const player = playerFactory.createPlayerWithName(name);
    await createPlayerService.createPlayer(
        user,
        player,
    );

    // try to create player with duplicate name
    try {
      await createPlayerService.createPlayer(
          user,
          player,
      );
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === CreatePlayerErrors.DuplicatePlayername);
    }
  });

  // 3.
  it('Should throw NonexistentUser error', async function() {
    // create a new nonexistent user entity
    const username = 'test_username';
    const madeUpID = -1;
    const nonExistentUser = userFactory.createUserWithUsernameAndID(
        madeUpID,
        username,
    );
    // create a new player entity
    const name = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(name);

    // try to create player for non existent user
    try {
      await createPlayerService.createPlayer(
          nonExistentUser,
          newPlayer,
      );
      assert.fail('Expected nonexistent user error');
    } catch (err) {
      assert(err.message === CreatePlayerErrors.NonexistentUser);
    }
  });
});
