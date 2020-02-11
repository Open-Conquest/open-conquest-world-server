import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../src/utils/log';
import {User} from '../../../../src/domain/User';
import {armyRepository} from '../../../../src/repos/implementations/';
import {userRepository} from '../../../../src/repos/implementations/';

const assert = chai.assert;

describe('ArmyRepository', function() {
  it('getAllArmies should return an array of domain armies', async function() {
    throw new Error('no impl');
    // create a new user
    let createdUser;
    const username = 'test_username';
    const password = 'test_password';
    userRepository.createUser(username, password)
        .then((user) => {
          createdUser = user;
          // setup new armies for test user
          armyRepository.createEmptyArmy(createdUser);
        })
        .then((army) => {
          // get response form getAllArmies
          armyRepository.getAllArmies(createdUser);
        })
        .then((armies) => {
          // assertions on armies
          throw new Error('no assertions implemented');
        })
        .catch((err) => {
          log(err);
          throw err;
        });
  });
});
