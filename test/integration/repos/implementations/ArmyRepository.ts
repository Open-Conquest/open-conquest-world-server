import * as chai from 'chai';
import * as mocha from 'mocha';
import {ArmyRepository} from '../../../../src/repos/implementations/ArmyRepository';
import {Army} from '../../../../src/domain/Army';
import {log} from '../../../../src/utils/log';
import { User } from '../../../../src/domain/User';
import { EntityId } from '../../../../src/domain/Entity';

const armyRepository = new ArmyRepository();

describe('ArmyRepository', function() {
  /**
   * This test is meant to make sure that the repo returns the expected armies
   * in the expected format `ArmyEntity`.
   */
  it('should get expected test armies', async function() {
    try {
      const id = new EntityId(10);
      const user = new User(id);
      const armies = await armyRepository.getAllArmies(user);
      // assertions to make sure that armies is what's expected
      // in this case Array<Army>
      for (let i = 0; i < armies.length; i++) {
        log(armies[i]);
        chai.expect(armies[i]);
        chai.assert(armies[i]);
      }
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
