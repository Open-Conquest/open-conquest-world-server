import * as chai from 'chai';
import * as mocha from 'mocha';
import {TileRepository} from '../../../../src/repos/implementations/TileRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

const tileRepository = new TileRepository();

describe('TileRepository', function() {
  it('should get expected test tiles', async function() {
    try {
      const tiles = await tileRepository.getAllTiles();
      expect(tiles ).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
  it('should get the expected test tile for (row, col)', async function() {
    try {
      const tile = await tileRepository.getTile(0, 0);
      expect(tile).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
