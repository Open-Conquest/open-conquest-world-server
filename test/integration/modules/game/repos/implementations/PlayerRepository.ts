/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {playerRepository} from '../../../../../../src/modules/player/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

describe('PlayerRepository', function() {
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

  it('createNewPlayer should create a new player & return valiud JWT', async function() {
    // create a new player that would come in through a request
    const playername = 'test_playername';
    const password = 'test_password';

    return playerRepository.createPlayer(playername, password)
        .then((newPlayer) => {
          // assert that the player returned has the expected playername
          assert(newPlayer.getPlayername().getString() === playername);
        })
        .catch((err) => {
          assert.fail(err);
        });
  });

  it('createNewPlayer should fail with a duplicate playername', async function() {
    // create a new player that would come in through a request
    const playername = 'test_playername';
    const password = '143f13edxex1x1fg43f3sdfg215g';

    return playerRepository.createPlayer(playername, password)
        .then((newPlayer) => {
          return playerRepository.createPlayer(playername, password);
        })
        .then((newPlayer) => {
          assert.fail('Player with duplicate playername shouldn\'t have been created');
        })
        .catch((err) => {
          assert(err.message === 'Duplicate playername error', 'Unexpceted err message: ' + err.message);
        });
  });
});
