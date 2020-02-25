/* eslint-disable max-len */
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';
import {City} from '../../../../../../src/modules/game/domain/City';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../repos/implementations/createTestPlayer';

import {createCityService} from '../../../../../../src/modules/game/services/createCity';

/**
 * Summary of tests for CreateCityService:createCity
 * 1. Should create a city with the expected properties
 */

describe('CreateCityService:createCity', function() {
  const assert = chai.assert;

  const cityFactory = new CityFactory();

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
});
