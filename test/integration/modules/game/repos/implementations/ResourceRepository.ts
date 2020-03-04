/* eslint-disable max-len */
import {ResourcesFactory} from '../../../../../../src/modules/game/factories/ResourcesFactory';
import {resourcesRepository} from '../../../../../../src/modules/game/repos/implementations';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ResourcesRepositoryErrors} from '../../../../../../src/modules/game/repos/ResourcesRepositoryErrors';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';

/**
 * Summary of tests for ResourceRepository:createResources
 * 1. Should create expected resources for player
 * 2. Should throw NonexistentPlayer error
 */
describe('ResourceRepository:createResources', function() {
  const assert = chai.assert;
  const resourcesFactory = new ResourcesFactory();
  const playerFactory = new PlayerFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create expected resources for player', async function() {
    const player = await createTestPlayer();

    const resources = resourcesFactory.createDefaultResources();
    resources.$playerID = player.$id;

    const createdResources = await resourcesRepository.createResources(
        player,
        resources,
    );

    // assert resources have expected values
    assert(createdResources.$playerID.$value === resources.$playerID.$value,
        'Unexpected player id');
    assert(createdResources.$gold === resources.$gold,
        'Unexpected amount of gold');
  });

  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );

    const resources = resourcesFactory.createDefaultResources();
    resources.$playerID = player.$id;

    try {
      await resourcesRepository.createResources(
          player,
          resources,
      );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === ResourcesRepositoryErrors.NonexistentPlayer);
    }
  });
});
