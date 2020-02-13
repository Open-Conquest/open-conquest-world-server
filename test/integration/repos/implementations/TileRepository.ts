import * as chai from 'chai';
import * as mocha from 'mocha';
import {tileRepository} from '../../../../src/repos/implementations/';
import {log} from '../../../../src/shared/log';

const expect = chai.expect;

describe('TileRepository', function() {
  it('should get expected test tiles', async function() {
    try {
      const tiles = await tileRepository.getAllTiles();
      expect(tiles ).to.be.not.null;
      throw new Error('no strong assertions');
    } catch (err) {
      log.error(err);
      throw err;
    }
  });
  it('should get the expected test tile for (row, col)', async function() {
    try {
      const tile = await tileRepository.getTile(0, 0);
      expect(tile).to.be.not.null;
      throw new Error('no strong assertions');
    } catch (err) {
      log.error(err);
      throw err;
    }
  });
});
