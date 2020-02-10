import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../src/utils/log';
import {User} from '../../src/domain/User';
import { RegisterUserRequest, RegisterUserRequestData } from '../../src/services/requests/RegisterUserRequest';

const assert = chai.assert;

describe('RegisterUserRequest', function() {
  it('fromJSON should create the expected request', function() {
    const username = 'test_username';
    const password = 'test_password';
    const requestData = {
      'username': username,
      'password': password,
    };
    const request = new RegisterUserRequest(requestData);

    const user = request.getUser();

    assert(user.getUsername() === 'fuck');
  });
});
