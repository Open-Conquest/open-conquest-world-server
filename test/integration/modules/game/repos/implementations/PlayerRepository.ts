/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {playerRepository} from '../../../../../../src/modules/game/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

const userFactory = new UserFactory();
const playerFactory = new PlayerFactory();

describe('PlayerRepository:createPlayer', function() {
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

  it('should create a new player with the expected name', async function() {
    const username = 'test_username';
    const hashedPassword = 'q1f8923hfkdjhf2ir3r';
    // register a new user to register the player for
    const newUser = userFactory.createUserWithHashedPassword(null, username, hashedPassword);
    const user = await userRepository.createUser(newUser);

    // create a new player that would come in through a request
    const playername = 'test_playername';
    const newPlayer = playerFactory.createPlayerWithName(playername);

    const createdPlayer = await playerRepository.createPlayer(user, newPlayer);

    assert(createdPlayer.getNameString() === playername);
  });
});
