import {log} from '../utils/log';
import {Request} from '../Request';
import {BaseServices} from '../services/BaseServices';
import {ServiceNames} from '../services/ServiceNames';

/**
 * WorldServices is meant to route jsons to the appropriate services.
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
   * @param {*} json
   * @return {Request}
   * @memberof WorldServices
   */
  dispatchRequest(json): any {
    log('WorldService received json: ' + JSON.stringify(json));

    const services = this.services;
    return new Promise( function(resolve, reject) {
      try {
        json = Request.fromJSON(json);
      } catch (err) {
        reject(err);
      }
      services.get(json.serviceName).handle(json)
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
