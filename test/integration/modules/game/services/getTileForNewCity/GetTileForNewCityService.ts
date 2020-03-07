/* eslint-disable max-len */
import {Tile} from '../../../../../../src/modules/game/domain/Tile';
import {TileType} from '../../../../../../src/modules/game/domain/TileType';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestMapWithTiles} from '../../../../scripts/createTestMapWithTiles';

import {getTileForNewCityService} from '../../../../../../src/modules/game/services/getTileForNewCity';

/**
 * Summary of tests for GetTileForNewCityService:getTile
 * 1. Should get the best tile for a new city
 */

describe('GetTileForNewCityService:getTile', function() {
  const assert = chai.assert;

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
    const map = await createTestMapWithTiles();

    const tile = await getTileForNewCityService.getTile();

    // assert that tile has expected properties
    assert(tile.$mapID.$value === map.$id.$value, 'Unexpected mapID');
    assert(tile.$row < map.$maxRows, 'Unexpected row');
    assert(tile.$row < map.$maxCols, 'Unexpected col');
    assert(tile.$type === TileType.Grass, 'Unexpected type');
  });
});
