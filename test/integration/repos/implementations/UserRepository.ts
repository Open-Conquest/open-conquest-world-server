import * as chai from 'chai';
import * as mocha from 'mocha';
import {UserRepository} from '../../../../src/repos/implementations/UserRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

const mapRepository = new UserRepository();

describe('UserRepository', function() {
  it('should get expected test users', async function() {
    try {
      const users = await mapRepository.getAllUsers();
      expect(users ).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
