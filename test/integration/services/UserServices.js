import {log} from '../../../src/utils/log';
import {chai} from 'chai';
const should  = chai.should();
const expect  = chai.expect;
const assert  = chai.assert;

// run all of the test on user services
// ensure that messages are dispatched properly
import {UserServices} from '../../../src/services/UserServices';
import {Request} from '../../../src/Request';
let userServices      = new UserServices();

describe('UserServices', function() {
  it('should get expected test users', function() {
    let request = new Request('user', 'get', {});
    return userServices.handle(request).then(res => {
      
      // assertions on user data
      let user_data = res.data;
      assert(user_data.length > 0);
      for (let i = 0; i < user_data.length; i++) {
        user_data[i].user_name.should.equal('test_user_' + (i+1));
        user_data[i].world_id.should.equal(1);
        user_data[i].user_id.should.equal(i+1);
      }

    }).catch(err => {
      throw err;
    });
  });

  it('should get a single user that was specified', function() {
    let request = new Request('user', 'get', {});
  })
});