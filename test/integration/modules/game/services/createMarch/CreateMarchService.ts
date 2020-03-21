/* eslint-disable max-len */
import {March} from '../../../../../../src/modules/game/domain/March';
import {MarchFactory} from '../../../../../../src/modules/game/factories/MarchFactory';
import {CreateMarchErrors} from '../../../../../../src/modules/game/services/createMarch/CreateMarchErrors';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';

import {createMarchService} from '../../../../../../src/modules/game/services/createMarch';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {createTestPlayerWithArmy} from '../../../../scripts/createTestPlayerWithArmy';

const marchFactory = new MarchFactory();

/**
 * Summary of tests for CreateMarchService:createMarch
 * 1. Should create the expected march for the player
 * 2. Should throw InsufficientUnits error
 * 3. Should throw NonexistentPlayer error
 * 4. Should throw NonexistentTile error
 */

describe('CreateMarchService:createMarch', function() {
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
  it('Should create a new march for an existing user', async function() {
    await createTestWorld();
    // create a player to create the march for
    const player = await createTestPlayerWithArmy();
    // choose a subset of the player's army to create the march with
    const army = player.$armies[0];
    army.$units[0].$count = 1;
    // create a march entity with the player's army
    const march = marchFactory.createMarch(
        null, army, 0, 0, 5, 5, null,
    );

    // try to create a march
    const createdMarch = await createMarchService.createMarch(
        player, march, army,
    );

    log.info('created march', createdMarch);

    // assert created march has expected values
    assert(createdMarch.$startCol === 0);
    assert(createdMarch.$startRow === 0);
    assert(createdMarch.$endRow === 5);
    assert(createdMarch.$endCol === 5);
    assert(createdMarch.$army.$id.$value === player.$armies[0].$id.$value);
    assert(createdMarch.$army.$units[0].$count === player.$armies[0].$units[0].$count / 2);
    assert(createdMarch.$army.$units[0].$unit.$type === player.$armies[0].$units[0].$unit.$type);
    assert(createdMarch.$army.$units[0].$unit.$attack === player.$armies[0].$units[0].$unit.$attack);
    assert(createdMarch.$army.$units[0].$unit.$defense === player.$armies[0].$units[0].$unit.$defense);
    assert(createdMarch.$army.$units[0].$unit.$goldCost === player.$armies[0].$units[0].$unit.$goldCost);
  });
});
