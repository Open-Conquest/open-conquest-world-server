const log     = require('../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on map services
// ensure that messages are dispatched properly
const CityServices    = require('../../../../src/services/city/CityServices');
const Request         = require('../../../src/Request');
let cityServices      = new CityServices();

describe('CityServices', function() {
  it('should get expected test cities', function() {
    let request = new Request('city', 'get', {});
    return cityServices.handle(request).then(res => {

      let city_data = res.data;
      assert(city_data.length > 0);
      // assertions for map data
      for (let i = 0; i < res.length; i++) {
        city_data[i].city_id.should.equal(i+1);
        city_data[i].tile_id.should.equal(i+1 * (i*14));
        city_data[i].user_id.should.equal(i+1);
        city_data[i].city_level.should.equal(i+1);
        city_data[i].city_nane.should.equal('test_city_' + i);
      }

    }).catch(err => {
      log(err);
      throw err;
    });
  });
});