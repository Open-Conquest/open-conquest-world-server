import * as chai from 'chai';
import * as mocha from 'mocha';
import {mapRepository} from '../../../../src/repos/implementations/';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

describe('MapRepository', function() {
  it('should get expected test maps', async function() {
    try {
      const maps = await mapRepository.getAllMaps();
      expect(maps ).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
