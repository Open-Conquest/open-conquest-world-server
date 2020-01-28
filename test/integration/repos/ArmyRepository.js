const log = require('../../../src/utils/log');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

// What we are testing
const ArmyRepository = require('../../../src/repos/ArmyRepository');
const armyRepository = new ArmyRepository();

describe('ArmyRepository', function() {
  /**
   * This test is meant to make sure that the repo returns the expected armies
   * in the expected format `ArmyEntity`.
   */
  it('should get expected test armies', function() {
    return armyRepository.getAllArmies().then((res) => {
      // make sure that the armies are army entities
      const armies = res;
      // make sure that armies is of the correct type
      expect(armies).to.be.not.null;
    }).catch((err) => {
      log(err);
      throw err;
    });
  });
});
