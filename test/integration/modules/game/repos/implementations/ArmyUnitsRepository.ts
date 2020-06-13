/* eslint-disable max-len */
import {ArmyUnitsFactory} from '../../../../../../src/modules/game/factories/ArmyUnitsFactory';
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {ArmyUnitsRepositoryErrors} from '../../../../../../src/modules/game/repos/ArmyUnitsRepositoryErrors';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {armyUnitsRepository} from '../../../../../../src/modules/game/repos/implementations';
import {createTestArmy} from '../../../../scripts/createTestArmy';

const assert = chai.assert;
const expect = chai.expect;
const armyFactory = new ArmyFactory();
const armyUnitsFactory = new ArmyUnitsFactory();

/**
 * Summary of tests for ArmyUnitsRepository
 *
 * :createArmyUnits
 * 1. Should create expected army units for army
 * 2. Should throw NonexistentArmy error
 *
 * :getArmyUnits
 * 1. Should get the expected units in an army
 *
 * :updateUnits
 * 1. Should update the units as expected
 */
describe('ArmyUnitsUnitsRepository:createArmyUnits', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create expected army units for army', async function() {
    // create a test army to add units too
    const army = await createTestArmy();
    const units = armyUnitsFactory.createDefaultArmyUnits();
    units.$armyID = army.$id;

    const createdArmyUnits = await armyUnitsRepository.createArmyUnits(
        army,
        units,
    );

    // assert army have expected values
    assert(
        createdArmyUnits.$count === units.$count,
        'Unexpected unit count',
    );
    assert(
        createdArmyUnits.$armyID.$value === units.$armyID.$value,
        'Unexpected army id',
    );
  });

  // 2.
  it('Should throw NonexistentArmy error', async function() {
    // create an army with units but a nonexistent id
    const units = armyFactory.createDefaultArmyWithUnits().$units;
    const army = armyFactory.createArmy(-1, units);

    // try to save the army's units to the database
    try {
      await armyUnitsRepository.createArmyUnits(army, army.$units[0]);
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === ArmyUnitsRepositoryErrors.NonexistentArmy);
    }
  });
});

describe('ArmyUnitsUnitsRepository:getArmyUnits', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should get the expected units in an army', async function() {
    // // const army = await createTestArmy();

    // const army = armyFactory.createArmy(
    //     1,
    //     1,
    // );

    // const armyUnits = await armyUnitsRepository.getArmyUnits(army);
  });
});
