import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserRepository} from '../../../../src/repos/implementations/UserRepository';
import {log} from '../../../../src/utils/log';
import {User} from '../../../../src/domain/User';

const assert = chai.assert;

const userRepository = new UserRepository();

describe('UserRepository', function() {
  it('createNewUser should create a new user', async function() {
    // create a new user that would come in through a request
    const user = new User(null, 'test_username');
    userRepository.createNewUser(user)
        .then((newUser) => {
          assert(newUser.equals(user));
        })
        .catch((err) => {
          log(err);
          throw err;
        });
  });
  it('createNewUser should fail with a duplicate username', async function() {
    throw new Error('no impl');
  });
  it('createNewUser should fail with a empty username', async function() {
    throw new Error('no impl');
  });
});
