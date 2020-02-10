import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../src/utils/log';
import {User} from '../../../../src/domain/User';
import {armyRepository} from '../../../../src/repos/implementations/';
import {userRepository} from '../../../../src/repos/implementations/';

const assert = chai.assert;

describe('ArmyRepository', function() {
  it('getAllArmies should return an array of domain armies', async function() {
    // setup a new test user
    let newUser = new User(null, 'username');
    userRepository.createUser(newUser)
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
          throw new Error('no assertions implemented');
        })
        .catch((err) => {
          log(err);
          throw err;
        });
    // cleanup after test
  });
});
