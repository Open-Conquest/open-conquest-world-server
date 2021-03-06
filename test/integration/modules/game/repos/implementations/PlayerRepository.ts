/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {playerRepository} from '../../../../../../src/modules/game/repos/implementations';
import {PlayerRepositoryErrors} from '../../../../../../src/modules/game/repos/PlayerRepositoryErrors';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestUser} from '../../../../scripts/createTestUser';

const userFactory = new UserFactory();
const playerFactory = new PlayerFactory();

const expect = chai.expect;
const assert = chai.assert;

/**
 * Summary of tests for PlayerRepository
 *
 * :createPlayer
 * 1. Should create a new player with the expected name
 * 2. Should throw NonexistentUser error
 * 3. Should throw DuplicatePlayername error
 *
 * :getPlayer
 * 1. Should get a player with the expected name
 * 2. Should return null for a non-existent player
 */
describe('PlayerRepository:createPlayer', function() {
  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create a new player with the expected name', async function() {
    // create user and army for player
    const user = await createTestUser();

    // create a new player entity
    const playername = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(playername);

    // try to create player entity
    const createdPlayer = await playerRepository.createPlayer(user, newPlayer);

    expect(createdPlayer.$id.$value).to.be.above(0);
  });

  it('Should throw NonexistentUser error', async function() {
    // create a nonexistent user entity to try and create the player for
    const nonexistentUserID = -1;
    const username = 'test_username';
    const hashedPassword = 'q1f8923hfkdjhf2ir3r';
    const nonexistentUser = userFactory.createUserWithHashedPassword(
        nonexistentUserID,
        username,
        hashedPassword,
    );

    // create a new player entity
    const playername = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(playername);

    // try to save the player entity to the database for a non existent user
    try {
      await playerRepository.createPlayer(
          nonexistentUser,
          newPlayer,
      );
      assert.fail('Expected nonexistent user error');
    } catch (err) {
      assert(err.message === PlayerRepositoryErrors.NonexistentUser);
    }
  });

  it('Should throw DuplicateUsername error', async function() {
    const user = await createTestUser();

    // create a new player entity
    const playername = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(playername);

    // save original player to database
    await playerRepository.createPlayer(user, newPlayer);

    // try to create another player with the same name
    try {
      await playerRepository.createPlayer(user, newPlayer);
      assert.fail('Expected duplicate playername error');
    } catch (err) {
      assert(
          err.message === PlayerRepositoryErrors.DuplicatePlayername,
          'Instead error message was:' + err.message,
      );
    }
  });
});

describe('PlayerRepository:getPlayer', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should get the player with the expected name', async function() {
    // create a new user to register the player for
    const username = 'test_username';
    const hashedPassword = 'q1f8923hfkdjhf2ir3r';
    const newUser = userFactory.createUserWithHashedPassword(null, username, hashedPassword);
    const user = await userRepository.createUser(newUser);
    // create a new player entity
    const playername = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(playername);
    // try to save the player entity to the database
    const createdPlayer = await playerRepository.createPlayer(user, newPlayer);

    // try to get the player with repository
    const savedPlayer = await playerRepository.getPlayer(createdPlayer);

    // assert that the retrieved players name equals the created players name
    assert(savedPlayer.$name.$value === playername, 'Unexpected username');
  });

  it('Should return null for a non-existent player', async function() {
    // create a new player entity
    const playername = 'test_playername';
    const nonexistentPlayer = playerFactory.createPlayerWithName(playername);

    // try to get the player with repository
    const player = await playerRepository.getPlayer(nonexistentPlayer);

    // assert that the retrieved players name equals the created players name
    assert(player === null, 'Player should be null');
  });
});

