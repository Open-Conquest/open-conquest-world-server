import * as chai from 'chai';
import * as mocha from 'mocha';
import {ArmyServices} from '../../../src/services/ArmyServices';
import {Army} from '../../../src/domain/Army';
import {log} from '../../../src/utils/log';

const armyServices = new ArmyServices();

describe('ArmyServices', function() {
  /**
   * This test is meant to make sure that the repo returns the expected armies
   * in the expected format `ArmyEntity`.
   */
  it('should get expected test armies', async function() {
    try {
      const response = await armyServices.getArmy();
      // assertions to make sure that armies is what's expected
      // in this case Array<Army>
      // for (let i = 0; i < armies.length; i++) {
      //   log(armies[i]);
      //   chai.expect(armies[i]);
      //   chai.assert(armies[i]);
      // }
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
