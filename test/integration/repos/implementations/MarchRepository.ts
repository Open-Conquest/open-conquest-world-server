import * as chai from 'chai';
import * as mocha from 'mocha';
import {MarchRepository} from '../../../../src/repos/implementations/MarchRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

const marchRepository = new MarchRepository();

describe('MarchRepository', function() {
  it('should get expected test marchs', async function() {
    try {
      const marchs = await marchRepository.getAllMarches();
      expect(marchs ).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
