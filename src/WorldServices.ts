/**
 * The WorldService dispatches request to the appropriate handler.
 */

import {log} from './utils/log';
import {logError as logError} from './utils/log';
import {Request} from './Request';
import {fromRequest} from './Request';
import {BaseServices} from './services/BaseServices';
import {ServiceNames} from './services/ServiceNames';

/**
 *
 *
 * @export
 * @class WorldServices
 */
export class WorldServices {
  private services: Map<ServiceNames, BaseServices>;

  /**
   * Creates an instance of WorldServices.
   *
   * @memberof WorldServices
   */
  constructor() {
    log('WorldService initialized.');
    this.services = new Map<ServiceNames, BaseServices>();
  }

  /**
   * Register a new service with WorldServices.
   *
   * @param {BaseServices} service
   * @memberof WorldServices
   */
  registerService(service: BaseServices) {
    this.services.set(service.serviceName, service);
  }

  /**
   *
   *
   * @param {*} request
   * @return {Request}
   * @memberof WorldServices
   */
  dispatchRequest(request): any {
    log('WorldService received request: ' + JSON.stringify(request));

    const services = this.services;
    return new Promise( function(resolve, reject) {
      try {
        request = fromRequest(request);
      } catch (err) {
        reject(err);
      }
      services.get(request.serviceName).handle(request)
          .then((res) => {
            const response = JSON.stringify(res);
            log('WorldService returning response: ' + response);
            resolve(res);
          })
          .catch((err) => {
            err = JSON.stringify(err);
            reject(err);
          });
    });
  }
}
