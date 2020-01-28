const log     = require('../../../src/utils/log');
const chai    = require('chai');
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on map services
// ensure that messages are dispatched properly
const ArmyServices    = require('../../../src/services/ArmyServices');
const Request         = require('../../../src/Request');
let armyServices      = new ArmyServices();

describe('ArmyServices', function() {
  it('should get expected test armies', function() {
    let request = new Request('army', 'get', {});
    return armyServices.handle(request).then(res => {

      let army_data = res.data;
      assert(army_data.length > 0);
      // ensure that armies being returned have all the data expected
      for (let i = 0; i < army_data.length; i++) {
        let army = army_data[i];
        expect(army.army_id).to.be.not.null;
        expect(army.user_id).to.be.not.null;
        expect(army.army_units).to.be.not.null;
        if (army.army_units.length > 0) {
          for (let j = 0; j < army.army_units.length; j++) {
            let units = army.army_units[j];
            expect(units.army_units).to.be.not.null;
            expect(units.unit_id).to.be.not.null;
            expect(units.unit_count).to.be.not.null;
          }
        }
      }

    }).catch(err => {
      log(err);
      throw err;
    });
  });
});