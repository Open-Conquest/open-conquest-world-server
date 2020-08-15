import {assert, expect} from 'chai';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {playerEndpoints} from '../../../../../src/modules/game/endpoints';
import {createTestUser} from '../../../scripts/createTestUser';
import {CreatePlayerRequestDTO} from '../../../../../src/modules/game/services/createPlayer/CreatePlayerRequestDTO';
import {PlayerDTO} from '../../../../../src/modules/game/dtos/PlayerDTO';
import {UserDTO} from '../../../../../src/modules/user/dtos/UserDTO';
import {createTestMapWithTiles} from '../../../scripts/createTestMapWithTiles';
import { createTestWorld } from '../../../scripts/createTestWorld';

describe('CityEndpoints:getCities', function() {
  /**
   * Start a transaction before each test then rollback any changes after
   * the test finishes running. This ensures that no changes made to the
   * database during the tests are kept.
   */
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should get a list of cities for a player', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create a player

    // Create a city for player

    // Get the cities for player

    // Assert that the expected cities were returned
    assert.fail()
  });

  it('Should get a list of cities for a tile range', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create some players

    // Create cities for those players within a tile range

    // Get cities in that tile range

    // Assert that the expected cities were returned
    assert.fail()
  });

  it('Should get a list of cities for a map', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create some players

    // Create cities for those players within a tile range

    // Get cities in that tile range

    // Assert that the expected cities were returned
    assert.fail()
  });

  it('Should get a city for a tile', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create some players

    // Create cities for those players within a tile range

    // Get cities in that tile range

    // Assert that the expected cities were returned
    assert.fail()
  });

  it('Should get all the cities for a guild', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create some players

    // Create a guild

    // Add those players to the guild

    // Create cities for those players

    // Get cities for that guild

    // Assert that the expected cities were returned
    assert.fail()
  });

  it('Should get all vassal\'s cities' , async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create some players

    // Create a guild

    // Make a king player

    // Make some players vassals

    // Create cities for those vassals

    // Get cities for that king's vassals

    // Assert that the expected cities were returned
    assert.fail()
  });
});
