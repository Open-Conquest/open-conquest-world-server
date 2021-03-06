/* eslint-disable max-len */
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';
import {City} from '../../../../../../src/modules/game/domain/City';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {TileFactory} from '../../../../../../src/modules/game/factories/TileFactory';
import {TileType} from '../../../../../../src/modules/game/domain/TileType';
import {CreateCityErrors} from '../../../../../../src/modules/game/services/createCity/CreateCityErrors';
import {getTileForNewCityService} from '../../../../../../src/modules/game/services/getTileForNewCity';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {createTestMapWithTiles} from '../../../../scripts/createTestMapWithTiles';

import {createCityService} from '../../../../../../src/modules/game/services/createCity';

/**
 * Summary of tests for CreateCityService:createCity
 * 1. Should create a city with the expected properties
 * 2. Should throw DuplicateCityname error
 * 3. Should throw NonexistentPlayer error
 * 4. Should throw NonexistentTile error
 */
describe('CreateCityService:createCity', function() {
  const assert = chai.assert;

  const cityFactory = new CityFactory();
  const playerFactory = new PlayerFactory();
  const tileFactory = new TileFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create a city with the expected properties', async function() {
    // create a new map to add the city to
    const map = await createTestMapWithTiles();

    // choose a tile to add the city to
    const tile = await getTileForNewCityService.getTile();

    const player = await createTestPlayer();

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
        tile.$row,
        tile.$col,
    );

    // try to use service to create new city
    const actualCity = await createCityService.createCity(player, city, tile);

    // assert city is what is expected
    assert(city.$name.$value === actualCity.$name.$value,
        'Unexpected name:' + actualCity.$name.$value);
    assert(city.$level.$value === actualCity.$level.$value,
        'Unexpected level:' + actualCity.$level.$value);
  });

  // 2.
  it('Should throw DuplicateCityname error', async function() {
    // create a new map to add the city to
    const map = await createTestMapWithTiles();

    // choose a tile to add the city to
    const tile = await getTileForNewCityService.getTile();

    const player = await createTestPlayer();

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
        tile.$row,
        tile.$col,
    );

    // try to use service to create new city
    await createCityService.createCity(player, city, tile);

    // try to create city with duplicate name
    try {
      await createCityService.createCity(player, city, tile);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === CreateCityErrors.DuplicateCityname,
          'Expected DuplicateCityname error instead was:' + err.message);
    }
  });

  // 3.
  it('Should throw NonexistentPlayer error', async function() {
    // create a new map to add the city to
    const map = await createTestMapWithTiles();

    // choose a tile to add the city to
    const tile = await getTileForNewCityService.getTile();

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
        tile.$row,
        tile.$col,
    );

    // try to create city with nonexistent player
    try {
      await createCityService.createCity(player, city, tile);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === CreateCityErrors.NonexistentPlayer,
          'Expected NonexistentPlayer error instead was:' + err.message);
    }
  });

  // 4.
  it('Should throw NonexistentTile error', async function() {
    // create a new map to add the city to
    const map = await createTestMapWithTiles();

    // choose a tile to add the city to
    const tile = tileFactory.createTile(
        -1,
        0,
        map.$maxRows + 1,
        map.$maxCols + 1,
        TileType.Grass,
    );

    const player = await createTestPlayer();

    // create a city entity for the user
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        null,
        name,
        level,
        -1,
        0,
    );

    // try to use service to create new city with nonexistent tile
    try {
      const actualCity = await createCityService.createCity(player, city, tile);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === CreateCityErrors.NonexistentTile);
    }
  });
});
