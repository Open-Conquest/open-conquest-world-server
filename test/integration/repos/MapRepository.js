const log     = require('../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on map services
// ensure that messages are dispatched properly
const MapServices   = require('../../../src/services/MapServices');
const Request       = require('../../../src/Request');
let mapServices     = new MapServices();

describe('MapServices', function() {
  it('should get expected test map', function() {
    let request = new Request('map', 'get', {});
    return mapServices.handle(request).then(res => {

      let map_data = res.data;
      assert(map_data.length > 0);
      // assertions for map data
      for (let i = 0; i < map_data.length; i++) {
        map_data[i].tile_row.should.equal(Math.floor((i)/10));
        map_data[i].tile_col.should.equal(i%10);
        map_data[i].map_id.should.equal(1);
      }

    }).catch(err => {
      throw err;
    });
  });
});