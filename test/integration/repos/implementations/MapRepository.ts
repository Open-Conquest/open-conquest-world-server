import * as chai from 'chai';
import * as mocha from 'mocha';
import {MapRepository} from '../../../../src/repos/implementations/MapRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

const mapRepository = new MapRepository();

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
