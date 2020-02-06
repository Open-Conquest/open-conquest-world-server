import * as chai from 'chai';
import * as mocha from 'mocha';
import {ArmyRepository} from '../../../../src/repos/implementations/ArmyRepository';
import {Army} from '../../../../src/domain/Army';
import {log} from '../../../../src/utils/log';
import { User } from '../../../../src/domain/User';
import { EntityId } from '../../../../src/domain/Entity';
import { UserRepository } from '../../../../src/repos/implementations/UserRepository';

const assert = chai.assert;

const userRepository = new UserRepository();
const armyRepository = new ArmyRepository();

describe('ArmyRepository', function() {
  it('getAllArmies should return an array of domain armies', async function() {
    // setup a new test user
    let newUser = new User(null, 'username');
    userRepository.createNewUser(newUser)
        .then((user) => {
          newUser = user;
          // setup new armies for test user
          armyRepository.createEmptyArmy(newUser);
        })
        .then((army) => {
          // get response form getAllArmies
          armyRepository.getAllArmies(newUser);
        })
        .then((armies) => {
          // assertions on armies
          console.log(armies);
        })
        .catch((err) => {
          log(err);
          throw err;
        });
    // cleanup after test
  });
});
