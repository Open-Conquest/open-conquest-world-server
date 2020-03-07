/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {MapFactory} from '../../../../../../src/modules/game/factories/MapFactory';
import {mapRepository} from '../../../../../../src/modules/game/repos/implementations';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

const mapFactory = new MapFactory();

/**
 * Summary of tests for MapRepository:createMap
 * 1. Should create a map with the expected properties
 */
describe('MapRepository:createMap', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create a map with the expected properties', async function() {
    // create a map entity
    const map = mapFactory.createMap(
        null,
        'Mapname',
        10,
        10,
    );

    const createdMap = await mapRepository.createMap(map);

    assert(createdMap.$name.$value === map.$name.$value, 'Unexpected name');
  });
});
