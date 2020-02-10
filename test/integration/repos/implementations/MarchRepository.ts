import * as chai from 'chai';
import * as mocha from 'mocha';
import {marchRepository} from '../../../../src/repos/implementations/';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

describe('MarchRepository', function() {
  it('should get expected test marchs', async function() {
    try {
      const marchs = await marchRepository.getAllMarches();
      expect(marchs ).to.be.not.null;
      throw new Error('no strong assertions');
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
