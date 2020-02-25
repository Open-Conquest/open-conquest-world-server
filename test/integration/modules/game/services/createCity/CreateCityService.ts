/* eslint-disable max-len */
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {Playername} from '../../../../../../src/modules/game/domain/Playername';
import {UserFactory} from '../../../../../../src/modules/user/factories/UserFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {userRepository} from '../../../../../../src/modules/user/repos/implementations';
import {createPlayerService} from 'src/modules/game/services/createPlayer';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

import {createCityService} from '../../../../../../src/modules/game/services/createCity';

/**
 * Summary of tests for CreateCityService:createCity
 * 1. Should create a new city for a new player
 */

describe('CreateCityService:createCity', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1. Should create a new city for a new player
  it('Should create a new city for a new player', async function() {
    assert.fail('no implemenation');
  });
});
