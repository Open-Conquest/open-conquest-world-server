import * as chai from 'chai';
import * as mocha from 'mocha';
import {Request} from "../../src/Request";
import {ServiceNames} from "../../src/services/ServiceNames";
import {ServiceOperations} from "../../src/services/ServiceOperations";
import {log} from '../../src/utils/log';

const assert = chai.assert;
const expect = chai.expect;

describe('Request', function() {
  it('should construct the expected Request', function() {
    const service = ServiceNames.User;
    const operation = ServiceOperations.RegisterUser;
    const data = {
      'test': 'test',
    };
    const request = new Request(service, operation, data);
    assert(request.getData() === data);
    assert(request.getService() === service);
    assert(request.getOperation() === operation);
  });

  it('fromJSON should returne the expected Request', function() {
    const service = ServiceNames.User;
    const operation = ServiceOperations.RegisterUser;
    const data = {
      'test': 'test',
    };
    const json = {
      'service': service,
      'operation': operation,
      'data': data,
    };
    const expectedRequest = new Request(service, operation, data);
    const request = Request.fromJSON(json);
    expect(request).to.deep.equal(expectedRequest);
  });

  it('toJSON should return the expected json', function() {
    const service = ServiceNames.User;
    const operation = ServiceOperations.RegisterUser;
    const data = {
      'test': 'test',
    };
    const expectedJson = {
      'service': service,
      'operation': operation,
      'data': data,
    };
    const request = new Request(service, operation, data);
    const json = request.toJSON();
    expect(json).to.deep.equal(expectedJson);
  });

  it('toJSONString should return the expected Request', function() {
    const service = ServiceNames.User;
    const operation = ServiceOperations.RegisterUser;
    const data = {
      'test': 'test',
    };
    const expectedJson = {
      'service': service,
      'operation': operation,
      'data': data,
    };
    const expectedString = JSON.stringify(expectedJson);
    const request = new Request(service, operation, data);
    const realString = request.toJSONString();
    expect(realString).to.deep.equal(expectedString);
  });
});
