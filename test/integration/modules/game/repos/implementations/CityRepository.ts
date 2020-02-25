/* eslint-disable max-len */
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {City} from '../../../../../../src/modules/game/domain/City';
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';

import {createTestPlayer} from './createTestPlayer';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

import {cityRepository} from '../../../../../../src/modules/game/repos/implementations';

/**
 * Summary of tests for CityRepository:createCity
 * 1. Should create a city with the expected properties
 * 2. Shouldn't create a city on a tile that doesn't exist
 * 3. Shouldn't create a city for a user that doesn't exist
 */
describe('CityRepository:createCity', function() {
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

  // 1. Should create a city with the expected properties
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
    log.info('saved city', savedCity);
    assert(city.$name.$value === savedCity.$name.$value, 'Unexpected name');
    assert(city.$level.$value === savedCity.$level.$value, 'Unexpected level');
  });
});
