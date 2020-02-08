import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {GetArmiesResponse} from '../../../src/services/responses/GetArmiesResponse';
import {ArmyUnits, UnitType} from '../../../src/domain/ArmyUnits';
import {Army} from '../../../src/domain/Army';
import {EntityId} from '../../../src/domain/Entity';
import {User} from '../../../src/domain/User';
import { armyServices } from '../../../src/services';
import { armyRepository, userRepository } from '../../../src/repos/implementations';

describe('ArmyServices', function() {
  it('should return expected GetArmiesResponse for a user with a single army', async function() {
    // create expected data
    const unitId = new EntityId(0);
    const expectedUnit = new ArmyUnits(unitId, UnitType.Wizard, 10);
    const expectedUnits = [];
    expectedUnits.push(expectedUnit);
    const expectedArmy = new Army(expectedUnits);
    const expectedArmies = [];
    expectedArmies.push(expectedArmy);
    const expectedUserId = new EntityId(2);
    const expectedUser = new User(expectedUserId, 'username');
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

  it('should return expected GetArmiesResponse for a user with multiple armies', async function() {
    // create expected data
    const user = new User(null, 'username');

    // create new user
    userRepository.createUser(user)
        .then((user) => {
          // create new armies for user
          armyRepository.createEmptyArmy(user);
        })
        .catch((err) => {
          log(err);
          throw err;
        });
    // create new armies for user

    // add units to the armies for user

    const wizardId = new EntityId(0);
    const expectedUnit = new ArmyUnits(wizardId, UnitType.Wizard, 10);
    const expectedUnits = [];
    expectedUnits.push(expectedUnit);
    const expectedArmy = new Army(expectedUnits);
    const expectedArmies = [];
    expectedArmies.push(expectedArmy);
    const expectedUserId = new EntityId(2);
    const expectedUser = new User(expectedUserId, 'username');
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
