/* eslint-disable max-len */
import {CityFactory} from '../../../../../../src/modules/game/factories/CityFactory';
import {City} from '../../../../../../src/modules/game/domain/City';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {CreateCityErrors} from '../../../../../../src/modules/game/services/createCity/CreateCityErrors';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';

import {getTileForNewCityService} from '../../../../../../src/modules/game/services/getTileForNewCity';

/**
 * Summary of tests for GetTileForNewCityService:getTile
 * 1. Should get the best tile for a new city
 */

describe('GetTileForNewCityService:getTile', function() {
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

  // 1.
  it('Should get the best tile for a new city', async function() {
    assert.fail('');
  });
});
