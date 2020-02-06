import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {GetArmiesResponse} from '../../../src/GetArmiesResponse';
import {ArmyUnits, UnitType} from '../../../src/domain/ArmyUnits';
import {Army} from '../../../src/domain/Army';
import {EntityId} from '../../../src/domain/Entity';
import {User} from '../../../src/domain/User';
import {ArmyRepository} from '../../../src/repos/implementations/ArmyRepository';
import {ArmyServices} from '../../../src/services/ArmyServices';

const armyRepository = new ArmyRepository();
const armyServices = new ArmyServices();

describe('ArmyServices', function() {
  it('should return expected GetArmiesResponse', async function() {
    // create expected data
    const unitId = new EntityId(0);
    const expectedUnit = new ArmyUnits(unitId, UnitType.Wizard, 10);
    const expectedUnits = [];
    expectedUnits.push(expectedUnit);
    const expectedArmy = new Army(expectedUnits);
    const expectedArmies = [];
    expectedArmies.push(expectedArmy);
    const expectedUserId = new EntityId(2);
    const expectedUser = new User(expectedUserId);
    const expectedResponse = new GetArmiesResponse(expectedUser, expectedArmies);

    // insert expected data
    armyRepository.createArmy(expectedUser, expectedArmy)
        .then((army) => {
          // call get armies with expected user
          armyServices.getArmies(expectedUser);
        })
        .then((response) => {
          chai.expect(response).to.deep.equal(expectedResponse);
        })
        .catch((err) => {
          log(err);
          throw err;
        });
  });
});
