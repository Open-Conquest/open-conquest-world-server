import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {RegisterUserRequest} from '../../../src/services/requests/RegisterUserRequest';
import {RegisterUserResponse} from '../../../src/services/responses/RegisterUserResponse';
import { UserServices } from '../../../src/services/UserServices';
import {User} from '../../../src/domain/User';
const assert = chai.assert;

describe('UserServices', function() {

  const userServices = new UserServices();
  it('should return expected GetArmiesResponse for a user with a single army', async function() {
  
  }); 
});
