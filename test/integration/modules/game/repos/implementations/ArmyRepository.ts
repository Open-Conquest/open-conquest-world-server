/* eslint-disable max-len */
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ArmyRepositoryErrors} from '../../../../../../src/modules/game/repos/ArmyRepositoryErrors';
import {armyRepository, playerRepository} from '../../../../../../src/modules/game/repos/implementations';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {createArmyService} from '../../../../../../src/modules/game/services/createArmy';

const assert = chai.assert;
const expect = chai.expect;

const armyFactory = new ArmyFactory();
const playerFactory = new PlayerFactory();

/**
 * Summary of tests for ArmyRepository
 *
 * :createArmy
 * 1. Should create expected army in database
 *
 * :updateArmy
 * 1. Should update army with expected values
 * 2. Should throw NonexistentArmy error
 * 3. Should throw NonexistentArmyUnits error
 *
 * :getArmyForPlayer
 * 1. Should get the expected army
 * 2. Should throw NonexistentPlayer error
 * 3. Should throw NonexistentArmy error
 */
describe('ArmyRepository:createArmy', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create expected army in database', async function() {
    // create army entity
    const army = armyFactory.createDefaultArmy();

    // save army to database
    const createdArmy = await armyRepository.createArmy(army);

    // assert army have expected values
    expect(createdArmy.$id.$value).to.be.above(0);
  });
});

describe('ArmyRepository:updateArmy', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should update army with expected values', async function() {
    // create army in database for player
    const player = await createTestPlayer();
    let expArmy = armyFactory.createDefaultArmyWithUnits();
    expArmy = await createArmyService.createArmyWithUnits(
        expArmy, expArmy.$units,
    );
    await playerRepository.updatePlayerArmy(
        player, expArmy,
    );

    // try to get the army from the database
    const actArmy = await armyRepository.getArmyForPlayer(player);

    // assert army has expected units
    expect(actArmy).to.deep.equal(expArmy);
  });

  it('Should throw NonexistentPlayer error', async function() {
    // create player entity that isn't in database
    const player = playerFactory.createPlayer(-1, 'nonexistent_name');

    // try to get the army for the player
    try {
      await armyRepository.getArmyForPlayer(player);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      expect(err.message).to.equal(ArmyRepositoryErrors.NonexistentPlayer);
    }
  });

  it('Should throw NonexistentArmy error', async function() {
    // create player entity that isn't in database
    const player = await createTestPlayer();

    // try to get the army for the player
    try {
      await armyRepository.getArmyForPlayer(player);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      expect(err.message).to.equal(ArmyRepositoryErrors.NonexistentArmy);
    }
  });
});

describe('ArmyRepository:getArmyForPlayer', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should get the expected army', async function() {
    // create army in database for player
    const player = await createTestPlayer();
    let expArmy = armyFactory.createDefaultArmyWithUnits();
    expArmy = await createArmyService.createArmyWithUnits(
        expArmy, expArmy.$units,
    );
    await playerRepository.updatePlayerArmy(
        player, expArmy,
    );

    // try to get the army from the database
    const actArmy = await armyRepository.getArmyForPlayer(player);

    // assert army has expected units
    expect(actArmy).to.deep.equal(expArmy);
  });

  it('Should throw NonexistentPlayer error', async function() {
    // create player entity that isn't in database
    const player = playerFactory.createPlayer(-1, 'nonexistent_name');

    // try to get the army for the player
    try {
      await armyRepository.getArmyForPlayer(player);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      expect(err.message).to.equal(ArmyRepositoryErrors.NonexistentPlayer);
    }
  });

  it('Should throw NonexistentArmy error', async function() {
    // create player entity that isn't in database
    const player = await createTestPlayer();

    // try to get the army for the player
    try {
      await armyRepository.getArmyForPlayer(player);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      expect(err.message).to.equal(ArmyRepositoryErrors.NonexistentArmy);
    }
  });
});
