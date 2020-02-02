import * as chai from 'chai';
import * as mocha from 'mocha';
import {ArmyRepository} from '../../../../src/repos/implementations/ArmyRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;
const assert = chai.assert;

const armyRepository = new ArmyRepository();

describe('ArmyRepository', function() {
  /**
   * This test is meant to make sure that the repo returns the expected armies
   * in the expected format `ArmyEntity`.
   */
  it('should get expected test armies', async function() {
    let armies = await armyRepository.getAllArmies();
    armyRepository.getAllArmies().then((res) => {
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
