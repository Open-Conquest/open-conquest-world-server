import * as chai from 'chai';
import * as mocha from 'mocha';
import {Response} from "../../src/Response";
import {ServiceNames} from "../../src/services/ServiceNames";
import {ServiceOperations} from "../../src/services/ServiceOperations";
import {log} from '../../src/utils/log';

const assert = chai.assert;
const expect = chai.expect;

describe('Response', function() {
  it('should construct the expected Response', function() {
    const service = ServiceNames.User;
    const operation = ServiceOperations.RegisterUser;
    const data = {
      'test': 'test',
    };
    const response = new Response(service, operation, data);
    assert(response.getData() === data);
    assert(response.getService() === service);
    assert(response.getOperation() === operation);
  });

  it('fromJSON should returne the expected Response', function() {
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
    const expectedResponse = new Response(service, operation, data);
    const response = Response.fromJSON(json);
    expect(response).to.deep.equal(expectedResponse);
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
    const response = new Response(service, operation, data);
    const json = response.toJSON();
    expect(json).to.deep.equal(expectedJson);
  });

  it('toJSONString should return the expected Response', function() {
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
    const response = new Response(service, operation, data);
    const realString = response.toJSONString();
    expect(realString).to.deep.equal(expectedString);
  });
});
