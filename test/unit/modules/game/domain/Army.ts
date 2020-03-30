/* eslint-disable max-len */
import {ArmyFactory} from '../../../../../src/modules/game/factories/ArmyFactory';
import {log} from '../../../../../src/shared/utils/log';
import * as chai from 'chai';
import * as mocha from 'mocha';
import {UnitType} from '../../../../../src/modules/game/domain/Unit';
import {ArmyErrors, Army} from '../../../../../src/modules/game/domain/Army';
import {ArmyUnits} from 'src/modules/game/domain/ArmyUnits';

const assert = chai.assert;
const expect = chai.expect;

const armyFactory = new ArmyFactory();

/**
 * Summary of tests for Army
 *
 * :split
 * 1. Should split an army into 2 expected armies
 * 2. Should throw InsufficientUnits error
 *
 * :numberOfUnits
 * 1. Should return the expected number of units
 * 2. Should return 0 when there are no units of type
 *
 * :removeUnits
 * 1. Should remove the expected number of units
 * 2. Should throw InsufficientUnits error
 */
describe('Army:split', function() {
  it('Should create split an army into 2 expected armies', async function() {
    const mainArmy = armyFactory.createDefaultArmyWithUnits();
    const marchArmy = armyFactory.createDefaultArmyWithUnits();

    mainArmy.split(marchArmy);

    expect(mainArmy.numberOfUnits(UnitType.Wizard)).to.equal(0);
    expect(marchArmy.numberOfUnits(UnitType.Wizard)).to.equal(10);
  });

  it('Should throw InsufficientUnits error', async function() {
    const mainArmy = armyFactory.createDefaultArmyWithUnits();
    const marchArmy = armyFactory.createDefaultArmyWithUnits();
    marchArmy.$units[0].$count = 100;

    try {
      mainArmy.split(marchArmy);
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(ArmyErrors.InsufficientUnits);
    }
  });
});

describe('Army:numberOfUnits', function() {
  it('Should return the expected number of units', async function() {
    const army = armyFactory.createDefaultArmyWithUnits();
    const count = army.numberOfUnits(UnitType.Wizard);
    expect(count).to.equal(10);
  });

  it('Should return 0 when there are no units of type', async function() {
    const army = armyFactory.createDefaultArmyWithUnits();
    const count = army.numberOfUnits(UnitType.Bear);
    expect(count).to.equal(0);
  });
});

describe('Army:removeUnits', function() {
  it('Should remove the expected number of units', async function() {
    const army = armyFactory.createDefaultArmyWithUnits();
    army.removeUnits(UnitType.Wizard, 1);
    let count = army.numberOfUnits(UnitType.Wizard);
    expect(count).to.equal(9);
    army.removeUnits(UnitType.Wizard, 1);
    count = army.numberOfUnits(UnitType.Wizard);
    expect(count).to.equal(8);
    army.removeUnits(UnitType.Wizard, 7);
    count = army.numberOfUnits(UnitType.Wizard);
    expect(count).to.equal(1);
    try {
      army.removeUnits(UnitType.Wizard, 2);
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(ArmyErrors.InsufficientUnits);
    }
  });

  it('Should throw InsufficientUnits error', async function() {
    const army = armyFactory.createDefaultArmyWithUnits();
    try {
      army.removeUnits(UnitType.Wizard, 11);
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(ArmyErrors.InsufficientUnits);
    }
    try {
      army.removeUnits(UnitType.Wizard, -1);
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(ArmyErrors.InsufficientUnits);
    }
  });
});
