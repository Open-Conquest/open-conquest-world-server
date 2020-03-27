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
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';

const marchFactory = new MarchFactory();
const playerFactory = new PlayerFactory();

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

    // const armyCopy = JSON.parse(JSON.stringify(player.$army));

    // create a march with the player's army
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
    // check that all of the expected units are in the march
    for (let i = 0; i < march.$army.$units.length; i++) {
      const type = march.$army.$units[i].$unit.$type;
      expect(march.$army.numberOfUnits(type)).to.equal(createdMarch.$army.numberOfUnits(type));
    }

    // assert that the player's army was reduced as expected
    assert.fail('Assert that the player\'s army was reduced as expected');
  });

  it('Should throw InsufficientUnits error', async function() {
    // create player to create the march for
    await createTestWorld();
    const player = await createTestPlayerWithArmy();

    // create a march with the player's army
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, null,
    );
    // artificially inflate the number of units in the player's army
    player.$army.$units[0].$count = player.$army.$units[0].$count + 1;

    // try to create a march that should throw insufficient units error
    try {
      const createdMarch = await createMarchService.createMarch(
          player, march,
      );
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrors.InsufficientUnits);
    }
  });

  it('Should throw NonexistentPlayer error', async function() {
    // create player to create the march for
    await createTestWorld();
    const player = playerFactory.createPlayer(
        -1, 'nonexistent_player',
    );

    // create a march with the player's army
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, null,
    );

    // try to create a march that should throw insufficient units error
    try {
      const createdMarch = await createMarchService.createMarch(
          player, march,
      );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrors.NonexistentPlayer);
    }
  });

  it('Should throw NonexistentTile error', async function() {
    // create player to create the march for
    const world = await createTestWorld();
    const player = await createTestPlayerWithArmy();

    // create a march with the player's army
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, world.$map.$maxRows+1, 5, null,
    );

    // try to create a march that should throw insufficient units error
    try {
      const createdMarch = await createMarchService.createMarch(
          player, march,
      );
      assert.fail('Expected NonexistentTile error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrors.NonexistentTile);
    }
  });
});
