/* eslint-disable max-len */
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';
import {City} from '../../../../../../src/modules/game/domain/City';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../repos/implementations/createTestPlayer';

import {createCityService} from '../../../../../../src/modules/game/services/createCity';

/**
 * Summary of tests for CreateCityService:createCity
 * 1. Should create a city with the expected properties
 * 2. Should throw an error for a duplicate city name.
 * 3. Should throw an error for a nonexistent player.
 */

describe('CreateCityService:createCity', function() {
  const assert = chai.assert;

  const cityFactory = new CityFactory();
  const playerFactory = new PlayerFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1. Should create a city with the expected properties
  it('Should create a city with the expected properties', async function() {
    const player = await createTestPlayer();

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
    );

    // try to use service to create new city
    const actualCity = await createCityService.createCity(player, city);

    // assert city is what is expected
    assert(city.$name.$value === actualCity.$name.$value, 'Unexpected name');
    assert(city.$level.$value === actualCity.$level.$value, 'Unexpected level');
  });

  // 2. Should throw an error for a duplicate city name
  it('Should throw an error for a duplicate city name', async function() {
    const player = await createTestPlayer();

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
    );

    // try to use service to create new city
    await createCityService.createCity(player, city);

    // try to create city with duplicate name
    try {
      await createCityService.createCity(player, city);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'Cityname taken');
    }
  });

  // 3. Should throw an error for a nonexistent player
  it('Should throw an error for a nonexistent player', async function() {
    // create non existent player entity
    const nonexistentPlayerID = -1;
    const player = playerFactory.createPlayer(
        nonexistentPlayerID,
        'test_playername',
    );

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
    );

    // try to create city with nonexistent player
    try {
      await createCityService.createCity(player, city);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'Player does not exist');
    }
  });
});
