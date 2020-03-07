/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {createArmyForPlayerService} from '../../../../../../src/modules/game/services/createArmyForPlayer';
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {CreateArmyForPlayerServiceErrors} from '../../../../../../src/modules/game/services/createArmyForPlayer/CreateArmyForPlayerServiceErrors';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ArmyUnitsFactory} from '../../../../../../src/modules/game/factories/ArmyUnitsFactory';

/**
 * Summary of tests for CreateAmryForPlayerService:createArmy
 * 1. Should create the expected army
 * 2. Should throw NonexistentPlayer error
 */
describe('CreateArmyForPlayerService:createArmy', function() {
  const assert = chai.assert;

  const armyFactory = new ArmyFactory();
  const playerFactory = new PlayerFactory();
  const armyUnitsFactory = new ArmyUnitsFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create the expected army', async function() {
    const player: Player = await createTestPlayer();

    const army = armyFactory.createArmy(
        null,
        player.$id.$value,
        null,
    );

    const createdArmy = await createArmyForPlayerService.createArmy(player, army);

    // test that army belongs to expected player
    assert(createdArmy.$playerID.$value === army.$playerID.$value);
  });

  // 2.
  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(-1, 'nonexistentplayer');
    const army = armyFactory.createDefaultArmy();
    army.$playerID = player.$id;
    try {
      await createArmyForPlayerService.createArmy(player, army);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === CreateArmyForPlayerServiceErrors.NonexistentPlayer);
    }
  });
});

/**
 * Summary of tests for CreateArmyForPlayerService:createArmyWithUnits
 * 1. Should create an army with the expected units
 * 2. Should throw NonexistentPlayer error
 */
describe('CreateArmyForPlayerService:createArmyWithUnits', function() {
  const assert = chai.assert;

  const armyFactory = new ArmyFactory();
  const playerFactory = new PlayerFactory();
  const armyUnitsFactory = new ArmyUnitsFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create an army with the expected units', async function() {
    // create a new player to add the army to
    const player: Player = await createTestPlayer();

    // create units to add to the army
    const units = [];
    units.push(armyUnitsFactory.createDefaultArmyUnits());

    // create a new army with the units
    const army = armyFactory.createArmy(
        null,
        player.$id.$value,
        units,
    );

    // save the army with the service
    const createdArmy = await createArmyForPlayerService.createArmyWithUnits(
        player, army, units,
    );

    // do something to test the created army
    for (let i = 0; i < units.length; i++) {
      assert(createdArmy.$units[i].$unit.$type === units[i].$unit.$type);
      assert(createdArmy.$units[i].$unit.$name === units[i].$unit.$name);
      assert(createdArmy.$units[i].$unit.$attack === units[i].$unit.$attack);
      assert(createdArmy.$units[i].$unit.$defense === units[i].$unit.$defense);
      assert(createdArmy.$units[i].$unit.$goldCost === units[i].$unit.$goldCost);
      assert(createdArmy.$units[i].$count === units[i].$count);
    }
  });

  // 2.
  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );
    const army = armyFactory.createDefaultArmy();
    try {
      const createdResources = await createArmyForPlayerService
          .createArmy(
              player,
              army,
          );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === CreateArmyForPlayerServiceErrors.NonexistentPlayer);
    }
  });
});