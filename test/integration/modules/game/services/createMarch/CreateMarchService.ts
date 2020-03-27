/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {March} from '../../../../../../src/modules/game/domain/March';
import {MarchFactory} from '../../../../../../src/modules/game/factories/MarchFactory';
import {CreateMarchErrors} from '../../../../../../src/modules/game/services/createMarch/CreateMarchErrors';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createMarchService} from '../../../../../../src/modules/game/services/createMarch';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {createTestPlayerWithArmy} from '../../../../scripts/createTestPlayerWithArmy';

const marchFactory = new MarchFactory();

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of tests for CreateMarchService:createMarch
 * 1. Should create the expected march for the player
 * 2. Should throw InsufficientUnits error
 * 3. Should throw NonexistentPlayer error
 * 4. Should throw NonexistentTile error
 */

describe('CreateMarchService:createMarch', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create a new march for an existing user', async function() {
    // create player to create the march for
    await createTestWorld();
    const player = await createTestPlayerWithArmy();

    // create a march with the player's army
    log.info('', player);
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, null,
    );
    const createdMarch = await createMarchService.createMarch(
        player, march,
    );

    // assert created march has expected values
    expect(createdMarch.$startCol).to.equal(0);
    expect(createdMarch.$startRow).to.equal(0);
    expect(createdMarch.$endCol).to.equal(5);
    expect(createdMarch.$endRow).to.equal(5);
    expect(createdMarch.$army.$id.$value).not.to.equal(player.$army.$id.$value);
  });
});
