const log     = require('../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on tile services
// ensure that messages are dispatched properly
const TileServices    = require('../../../src/services/TileServices');
const Request         = require('../../../src/Request');
let tileServices      = new TileServices();

describe('TileServices', function() {
  it('should get expected test tile', function() {
    let request = new Request('tile', 'get', {tile_row: 0, tile_col: 0});
    return tileServices.handle(request).then(res => {

      // assertions for tile data
      let tile_data = res.data;
      tile_data.tile_row.should.equal(0);
      tile_data.tile_col.should.equal(0);

    }).catch(err => {
      throw err;
    });
  });
});