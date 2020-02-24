import {BaseEndpoints} from './BaseEndpoints';
import {ServiceNames} from './ServiceNames';
import {MessageDTO} from '../../../dtos/MessageDTO';
import {jwtMiddleware} from '../../../middleware';
import {log} from '../../../utils/log';

/**
 * Handles routing for all messages coming into the WorldServer.
 *
 * @export
 * @class WorldRouter
 */
export class WorldRouter {
  private endpoints: Map<ServiceNames, BaseEndpoints>;

  /**
   * Creates an instance of WorldEndpoints.
   * @memberof WorldEndpoints
   */
  constructor() {
    this.endpoints = new Map<ServiceNames, BaseEndpoints>();
  }

  /**
   * Register a set of endpoints under a service name. This mapping will be
   * used to route incoming requests in the handle method.
   *
   * @param {ServiceNames} serviceName
   * @param {BaseEndpoints} endpoints
   * @memberof WorldEndpoints
   */
  registerEndpoints(serviceName: ServiceNames, endpoints: BaseEndpoints) {
    this.endpoints.set(serviceName, endpoints);
  }

  /**
   * Handles an incoming message. This method should dispatch the message
   * based on the service name in the message. Endpoints are registered under
   * service names. So, the endpoint which is registered with the same service
   * name as the message should receive it. Since this message is accepting raw
   * data from the WSS, conversion to the initial MessageDTO happens here. But
   * this method returns pure json for the WSS to send back over the wire to
   * the client.
   *
   * @param {amy} json
   * @memberof WorldEndpoints
   */
  async handle(json: any): Promise<any> {
    log.info('WorldRouter handling message', json);

    // create message dto from json
    let message = MessageDTO.fromJSON(json);
    message.$user = null; // set user to null (it should not be set)

    // check if authentication should happen (any service beside user)
    if (message.$service !== ServiceNames.User) {
      // validates the jwt and sets the message's acting user based on claims
      message = jwtMiddleware.validateMessage(message);
    }

    // check if endpoint for message service exists
    if (this.endpoints.get(json.service) === undefined) {
      throw new Error('Nonexistent service: ' + json.service);
    } else {
      // dispatch request to appropriate endpoint
      const response = await this.endpoints.get(json.service).handle(message);
      return response.toJSON();
    }
  }
}
