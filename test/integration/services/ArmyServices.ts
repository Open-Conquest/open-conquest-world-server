import * as chai from 'chai';
import * as mocha from 'mocha';
import {ArmyServices} from '../../../src/services/ArmyServices';
import {ArmyRepository} from '../../../src/repos/implementations/ArmyRepository';
import {Army} from '../../../src/domain/Army';
import {log} from '../../../src/utils/log';
import {ArmyUnits, UnitType} from '../../../src/domain/ArmyUnits';
import {EntityId} from '../../../src/domain/Entity';
import { User } from '../../../src/domain/User';

const armyRepository = new ArmyRepository();
const armyServices = new ArmyServices();

describe('ArmyServices', function() {
  /**
   * This test is meant to make sure that the repo returns the expected armies
   * in the expected format `ArmyEntity`.
   */
  it('should get expected test armies', async function() {
    try {
      // insert expected data before making a request
      const unitId = new EntityId(0);
      const expectedUnit = new ArmyUnits(unitId, UnitType.Wizard, 10);
      const expectedUnits = [];
      expectedUnits.push(expectedUnit);
      const expectedArmy = new Army(expectedUnits);
      armyRepository.createArmy(expectedArmy);
      const expectedUserId = new EntityId(100);
      const expectedUser = new User(expectedUserId);

      // make a request
      const response = await armyServices.getArmy(expectedUser);

      // assert expected data is returned in request
      chai.assert(response.getService() === 'army');
      chai.assert(response.getOperation() === 'get');
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
