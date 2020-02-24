/* eslint-disable max-len */


import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

import {createPlayerController} from '../../../../../../src/modules/game/services/createPlayer';

/**
 * Summary of tests for CreatePlayerController:createPlayer
 * 1.
 */

describe('CreatePlayerController:createPlayer', function() {
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
  it('', async function() {
    assert.fail('no tests');
  });
});
