/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createResourcesForPlayerService} from '../../../../../../src/modules/game/services/createResourcesForPlayer';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import { ResourcesFactory } from '../../../../../../src/modules/game/factories/ResourcesFactory';
import { PlayerFactory } from '../../../../../../src/modules/game/factories/PlayerFactory';
import { CreateResourcesForPlayerErrors } from '../../../../../../src/modules/game/services/createResourcesForPlayer/CreateResourcesForPlayerErrors';


/**
 * Summary of tests for CreateResourcesForPlayerService:createResources
 * 1. Should return the expected resources
 * 2. Should throw NonexistentPlayer error
 */

describe('CreateResourcesForPlayerService:createResources', function() {
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

  // 1.
  it('Should return the expected resources', async function() {
    const player = await createTestPlayer();
    const resources = resourcesFactory.createDefaultResources();

    const createdResources = await createResourcesForPlayerService
        .createResources(
            player,
            resources,
        );

    assert(createdResources.$gold === resources.$gold);
    assert(createdResources.$playerID.$value === player.$id.$value);
  });

  // 2.
  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );
    const resources = resourcesFactory.createDefaultResources();
    try {
      const createdResources = await createResourcesForPlayerService
          .createResources(
              player,
              resources,
          );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === CreateResourcesForPlayerErrors.NonexistentPlayer);
    }
  });
});
