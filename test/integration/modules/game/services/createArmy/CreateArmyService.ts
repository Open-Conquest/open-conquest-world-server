/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {createArmyService} from '../../../../../../src/modules/game/services/createArmy';
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {CreateArmyErrors} from '../../../../../../src/modules/game/services/createArmy/CreateArmyErrors';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ArmyUnitsFactory} from '../../../../../../src/modules/game/factories/ArmyUnitsFactory';

const assert = chai.assert;
const expect = chai.expect;

const armyFactory = new ArmyFactory();
const armyUnitsFactory = new ArmyUnitsFactory();

/**
 * Summary of tests for CreateArmyService
 *
 * :createArmy
 * 1. Should create the expected army
 *
 * :createArmyWithUnits
 * 1. Should create an army with the expected units
 */

describe('CreateArmyService:createArmy', function() {
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
    // create army entity
    const army = armyFactory.createArmy(
        null, null,
    );

    // try to create army with service
    const createdArmy = await createArmyService.createArmy(army);

    // assert created army has expected values
    expect(createdArmy.$id.$value).to.be.above(0);
  });
});

describe('CreateArmyService:createArmyWithUnits', function() {
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
    // create units to add to the army
    const units = [];
    units.push(armyUnitsFactory.createDefaultArmyUnits());

    // create a new army with the units
    const army = armyFactory.createArmy(
        null, units,
    );

    // save the army with the service
    const createdArmy = await createArmyService.createArmyWithUnits(
        army, units,
    );

    // assert the army was created with expected units
    expect(createdArmy.$units.length).to.be.above(0);
    for (let i = 0; i < units.length; i++) {
      expect(createdArmy.$units[i].$unit).to.deep.equal(units[i].$unit);
      expect(createdArmy.$units[i].$count).to.equal(units[i].$count);
    }
  });
});
