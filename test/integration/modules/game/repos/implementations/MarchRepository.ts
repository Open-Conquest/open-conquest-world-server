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
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';

const marchFactory = new MarchFactory();
const armyFactory = new ArmyFactory();

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of tests for MarchRepository:createMarch
 * 1. Should create a new march with the expected army
 * 2. Should throw NonexistentArmy error
 * 3. Should throw NonexistentTile error for startTile
 * 3. Should throw NonexistentTile error for endTile
 */
describe('MarchRepository:createMarch', function() {
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
        player.$army,
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

    // assert created march has expected values
    assert(createdMarch.$startCol === 0);
    assert(createdMarch.$startRow === 0);
    assert(createdMarch.$endRow === 5);
    assert(createdMarch.$endCol === 5);
    assert(createdMarch.$army.$id.$value === player.$army.$id.$value);
    assert(createdMarch.$army.$units[0].$count === player.$army.$units[0].$count);
    assert(createdMarch.$army.$units[0].$unit.$type === player.$army.$units[0].$unit.$type);
    assert(createdMarch.$army.$units[0].$unit.$attack === player.$army.$units[0].$unit.$attack);
    assert(createdMarch.$army.$units[0].$unit.$defense === player.$army.$units[0].$unit.$defense);
    assert(createdMarch.$army.$units[0].$unit.$goldCost === player.$army.$units[0].$unit.$goldCost);
  });

  // 2.
  it('Should throw NonexistentArmy error', async function() {
    // create a test world
    await createTestWorld();

    // create a nonexistent army
    const army = armyFactory.createArmy(-1, null);

    // create march entity with player's army
    const march = marchFactory.createMarch(
        null,
        army,
        0,
        0,
        5,
        5,
        null,
    );
    // get tile entities for start, end of march
    const startTile = await tileRepository.getTileAt(0, 0);
    const endTile = await tileRepository.getTileAt(5, 5);

    // try to create march with nonexistent army
    try {
      await marchRepository.createMarch(march, startTile, endTile);
      assert.fail('Expected NonexistentArmy error');
    } catch (err) {
      expect(err.message).to.equal(MarchRepositoryErrors.NonexistentArmy);
    }
  });

  // 3.
  it('Should throw NonexistentTile error for startTile', async function() {
    // create a test world
    await createTestWorld();
    // create a new player to create the march for
    const player = await createTestPlayerWithArmy();
    // create march entity with player's army
    const march = marchFactory.createMarch(
        null,
        player.$army,
        0,
        0,
        5,
        5,
        null,
    );
    // get tile entities for start, end of march
    const startTile = await tileRepository.getTileAt(0, 0);
    // modify start tile id to be nonexistent
    startTile.$id.$value = -1;
    const endTile = await tileRepository.getTileAt(5, 5);

    // try to create march with nonexistent start tile
    try {
      await marchRepository.createMarch(march, startTile, endTile);
      assert.fail('Expected NonexistentTile error');
    } catch (err) {
      expect(err.message).to.equal(MarchRepositoryErrors.NonexistentTile);
    }
  });

  // 4.
  it('Should throw NonexistentTile error for endTile', async function() {
    // create a test world
    await createTestWorld();
    // create a new player to create the march for
    const player = await createTestPlayerWithArmy();
    // create march entity with player's army
    const march = marchFactory.createMarch(
        null,
        player.$army,
        0,
        0,
        5,
        5,
        null,
    );
    // get tile entities for start, end of march
    const startTile = await tileRepository.getTileAt(0, 0);
    const endTile = await tileRepository.getTileAt(5, 5);
    // modify start tile id to be nonexistent
    endTile.$id.$value = -1;

    // try to create march with nonexistent start tile
    try {
      await marchRepository.createMarch(march, startTile, endTile);
      assert.fail('Expected NonexistentTile error');
    } catch (err) {
      expect(err.message).to.equal(MarchRepositoryErrors.NonexistentTile);
    }
  });
});

