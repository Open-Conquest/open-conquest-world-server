import {chai} from 'chai';
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on world services
// ensure that messages are dispatched properly
import {WorldServices} from '../../src/WorldServices';
import {Request} from '../../src/Request';
let worldServices     = new WorldServices();

describe('WorldServices', function() {

  it('should dispatch messages to the correct service', function() {
    let request = new Request();
    worldServices.dispatchRequest('');
  });
});