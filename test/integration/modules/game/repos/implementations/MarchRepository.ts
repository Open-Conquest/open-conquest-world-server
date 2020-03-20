/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {MarchFactory} from '../../../../../../src/modules/game/factories/MarchFactory';
import {MarchRepositoryErrors} from '../../../../../../src/modules/game/repos/MarchRepositoryErrors';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {marchRepository, tileRepository} from '../../../../../../src/modules/game/repos/implementations';
import {createTestPlayerWithArmy} from '../../../../scripts/createTestPlayerWithArmy';

const marchFactory = new MarchFactory();

/**
 * Summary of tests for MarchRepository:createMarch
 * 1. Should create a new march with the expected army
 * 2. Should throw NonexistentPlayer error
 * 3. Should throw NonexistentArmy error
 */
describe('MarchRepository:createMarch', function() {
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
  it('Should create a new march with the expected army', async function() {
    // create a test world
    await createTestWorld();
    // create a new player to create the march for
    const player = await createTestPlayerWithArmy();
    // create march entity with player's army
    const march = marchFactory.createMarch(
        null,
        player.$armies[0],
        0,
        0,
        5,
        5,
        null,
    );
    // get tile entities for start, end of march
    const startTile = await tileRepository.getTileAt(0, 0);
    const endTile = await tileRepository.getTileAt(5, 5);

    // try to create march in database
    const createdMarch = await marchRepository.createMarch(
        march,
        startTile,
        endTile,
    );

    log.info('created march', createdMarch);

    // assert created march has expected values
    assert(createdMarch.$startCol === 0);
    assert(createdMarch.$startRow === 0);
    assert(createdMarch.$endRow === 5);
    assert(createdMarch.$endCol === 5);
    assert(createdMarch.$army.$id.$value === player.$armies[0].$id.$value);
    assert(createdMarch.$army.$units[0].$count === player.$armies[0].$units[0].$count);
    assert(createdMarch.$army.$units[0].$unit.$type === player.$armies[0].$units[0].$unit.$type);
    assert(createdMarch.$army.$units[0].$unit.$attack === player.$armies[0].$units[0].$unit.$attack);
    assert(createdMarch.$army.$units[0].$unit.$defense === player.$armies[0].$units[0].$unit.$defense);
    assert(createdMarch.$army.$units[0].$unit.$goldCost === player.$armies[0].$units[0].$unit.$goldCost);
  });
});

