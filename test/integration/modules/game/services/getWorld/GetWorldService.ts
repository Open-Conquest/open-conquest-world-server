/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

import {getWorldService} from '../../../../../../src/modules/game/services/getWorld/';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {World} from '../../../../../../src/modules/game/domain/World';

/**
 * Summary of tests for GetWorldService:getWorld
 * 1. Should get the expected world entity
 */
describe('GetWorldService:getWorld', function() {
  this.timeout(5000);
  const assert = chai.assert;
  const expect = chai.expect;

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

  // 1.
  it('Should get the expected world entity', async function() {
    // create a test world with a map, players, and cities
    const expectedWorld: World = await createTestWorld();

    // get world entity from service
    const actualWorld: World = await getWorldService.getWorld();

    // assert world has expected map
    expect(actualWorld.$map).to.be.deep.equal(expectedWorld.$map);
    // assert world has expected players
    assert(actualWorld.$players.length > 0);
    for (let i = 0; i < actualWorld.$players.length; i++) {
      assert(actualWorld.$players[i].$name.$value === expectedWorld.$players[i].$name.$value);
    }
    // assert world has expected cities
    assert(actualWorld.$cities.length > 0);
    for (let i = 0; i < actualWorld.$cities.length; i++) {
      assert(actualWorld.$cities[i].$name.$value === expectedWorld.$cities[i].$name.$value);
      assert(actualWorld.$cities[i].$level.$value === expectedWorld.$cities[i].$level.$value);
      assert(actualWorld.$cities[i].$row === expectedWorld.$cities[i].$row);
      assert(actualWorld.$cities[i].$col === expectedWorld.$cities[i].$col);
    }
  });
});
