import * as chai from 'chai';
import * as mocha from 'mocha';
import {WorldServices} from "../../src/WorldServices"
import {BaseServices} from "../../src/services/BaseServices";
import {ArmyServices} from "../../src/services/ArmyServices";
import {UserServices} from "../../src/services/UserServices";
import {Request} from "../../src/Request";
import {Response} from "../../src/Response";
import {ServiceNames} from "../../src/services/ServiceNames";
import {ServiceOperations} from "../../src/services/ServiceOperations";
import {log} from '../../src/utils/log';

const assert = chai.assert;

/**
 * Test service for testing WorldServices dispatchRequest method.
 */
class TestService extends BaseServices {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    super();
    this.serviceName = ServiceNames.Test;
  }
  // eslint-disable-next-line require-jsdoc
  handle(request: Request): Promise<Response> {
    return new Promise( function(resolve, reject) {
      resolve(new Response(ServiceNames.Test, ServiceOperations.Test, true));
    });
  }
}

/**
 * Extending ServiceNames and ServiceOperations enums for tests.
 */
declare module '../../src/services/ServiceNames' {
  export enum ServiceNames {
   Test = 'Test'
  }
}
declare module '../../src/services/ServiceOperations' {
  export enum ServiceOperations {
   Test = 'Test'
  }
}

describe('WorldService', function() {
  it('should dispatch the request to the correct service', async function() {
    // create new world services
    const worldServices = new WorldServices();
    // register services with world services
    const testService = new TestService();
    const armyService = new ArmyServices();
    const userService = new UserServices();
    worldServices.registerService(armyService);
    worldServices.registerService(testService);
    worldServices.registerService(userService);
    // make a request that should be dispatched to test services
    const request = new Request(ServiceNames.Test, ServiceOperations.Test, {});
    const requestJson = request.toJSON();
    return worldServices.dispatchRequest(requestJson)
        .then((res) => {
          assert(res.getService() === ServiceNames.Army);
          assert(res.getOperation() === ServiceOperations.Test);
          assert(res.getData() === true);
        })
        .catch((err) => {
          log(err);
          throw err;
        });
  });
  it('should error when dispatching to a non-existent service', async function() {
    // create new world services
    const worldServices = new WorldServices();
    // register services with world services
    const armyService = new ArmyServices();
    const userService = new UserServices();
    worldServices.registerService(armyService);
    worldServices.registerService(userService);
    // make a request that should be dispatched to test services
    const request = new Request(ServiceNames.Test, ServiceOperations.Test, {});
    const requestJson = request.toJSON();
    return worldServices.dispatchRequest(requestJson)
        .then((res) => {
          assert.fail('Expected error');
        })
        .catch((err) => {
          log(err);
        });
  });
});
