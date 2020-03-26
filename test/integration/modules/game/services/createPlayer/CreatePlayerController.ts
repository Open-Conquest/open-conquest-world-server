/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createPlayerController} from '../../../../../../src/modules/game/services/createPlayer';
import {CreatePlayerRequestDTO} from '../../../../../../src/modules/game/services/createPlayer/CreatePlayerRequestDTO';
import {PlayerDTO} from '../../../../../../src/modules/game/dtos/PlayerDTO';
import {UserDTO} from '../../../../../../src/modules/user/dtos/UserDTO';
import {createTestUser} from '../../../../scripts/createTestUser';
import {createTestWorld} from '../../../../scripts/createTestWorld';

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of tests for CreatePlayerController
 *
 * :createPlayer
 * 1. Should create a new player with a city, resources, and an army
 */

describe('CreatePlayerController:createPlayer', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create a new player with a city, resources, and army', async function() {
    await createTestWorld();
    // create dtos to simulate incoming request
    const createdUser = await createTestUser();
    const user = new UserDTO(
        createdUser.$id.$value, createdUser.$username.$value,
    );
    const player = new PlayerDTO('test_playername');
    const request = new CreatePlayerRequestDTO(player);

    // try to create player from request
    const response = await createPlayerController.createPlayer(
        user, request,
    );

    // assert response has expected values (player, city, resources, army)
    log.info(response);
  });
});
