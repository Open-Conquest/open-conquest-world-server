/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

/**
 * Summary of tests for ResourceRepository:createResources
 * 1. Should create expected resources for player
 */
describe('ResourceRepository:createResources', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create expected resources for player', async function() {
    assert.fail();
  });
});
