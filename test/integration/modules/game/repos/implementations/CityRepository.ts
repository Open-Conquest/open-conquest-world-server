/* eslint-disable max-len */
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {City} from '../../../../../../src/modules/game/domain/City';
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';
import {CityRepositoryErrors} from '../../../../../../src/modules/game/repos/CityRepositoryErrors';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';

import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

import {cityRepository} from '../../../../../../src/modules/game/repos/implementations';

/**
 * Summary of tests for CityRepository:createCity
 * 1. Should create a city with the expected properties
 * 2. Should throw DuplicateCityname error
 * 3. Should throw NonexistentPlayer error
 */
describe('CityRepository:createCity', function() {
  const assert = chai.assert;
  const cityFactory = new CityFactory();
  const playerFactory = new PlayerFactory();

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create a city with the expected properties', async function() {
    const player = await createTestPlayer();

    // create a new city for player
    const id = null;
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        id,
        name,
        level,
    );

    // create city in database
    const savedCity = await cityRepository.createCity(player, city);

    // assert saved city equals expected city
    assert(city.$name.$value === savedCity.$name.$value, 'Unexpected name');
    assert(city.$level.$value === savedCity.$level.$value, 'Unexpected level');
  });

  // 2.
  it('Should throw DuplicateCityname error', async function() {
    const player = await createTestPlayer();

    // create a new city for player
    const id = null;
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        id,
        name,
        level,
    );

    // create city in database
    const savedCity = await cityRepository.createCity(player, city);

    // create duplicate city
    try {
      await cityRepository.createCity(player, city);
      assert.fail('expected error');
    } catch (err) {
      assert(err.message === CityRepositoryErrors.DuplicateCityname);
    }
  });

  // 3.
  it('Should throw NonexistentPlayer error', async function() {
    // create nonexistent player
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );

    // create a new city for player
    const id = null;
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        id,
        name,
        level,
    );

    // create city with nonexistent player
    try {
      const savedCity = await cityRepository.createCity(player, city);
    } catch (err) {
      assert(err.message === CityRepositoryErrors.NonexistentPlayer);
    }
  });
});

/**
 * Summary of tests for CityRepository:getCity
 * 1. Should get a city that equals the one created
 * 2. Should return null for a city that doesn't exist
 */
describe('CityRepository:getCity', function() {
  const assert = chai.assert;
  const cityFactory = new CityFactory();

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create a city with the expected properties', async function() {
    const player = await createTestPlayer();

    // create a new city for player
    const id = null;
    const name = 'acropolis';
    const level = 1;
    const city = cityFactory.createCity(
        id,
        name,
        level,
    );

    // create city in database
    const savedCity = await cityRepository.createCity(player, city);

    // get the created city
    const actualCity = await cityRepository.getCity(savedCity);

    // assert saved city equals expected city
    assert(actualCity.$name.$value === savedCity.$name.$value, 'Unexpected name');
    assert(actualCity.$level.$value === savedCity.$level.$value, 'Unexpected level');
  });


  // 2.
  it('Should return null for a city that doesn\'t exist', async function() {
    // create a nonexistent city
    const id = null;
    const name = 'nonexistent_city';
    const level = 1;
    const city = cityFactory.createCity(
        id,
        name,
        level,
    );

    // get the created city
    try {
      const actualCity = await cityRepository.getCity(city);
      assert(actualCity === null, 'Expected null');
    } catch (err) {
      assert.fail('Didn\'t expect error:' + err.message);
    }
  });
});
