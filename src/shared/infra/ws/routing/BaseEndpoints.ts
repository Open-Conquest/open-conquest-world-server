import {ServiceOperations} from './ServiceOperations';
import {MessageDTO} from '../../../dtos/MessageDTO';
import {ServiceNames} from './ServiceNames';
import {log} from '../../../utils/log';

/**
 * The purpose of this class is to act as a parent class for all endpoint
 * suclasses. Since the routing code for directing messagesto instance methods
 * is repetitive, that will be implemented here for all endpoint subclasses to
 * inherit.
 *
 * @export
 * @class BaseEndpoints
 */
export class BaseEndpoints {
  handlers: any;
  serviceName: ServiceNames;

  /**
   * Creates an instance of BaseEndpoints. Initialize the operation -> method
   * map. Subclasses should add their operation -> instance method key value
   * pairs in their constructors.
   *
   * @memberof BaseEndpoints
   */
  constructor() {
    this.handlers = {};
  }

  /**
   * Handles a request by calling the instance method which should handle the
   * message. Which instance method should handle the message depends on the
   * messages operation. Each instance method of an endpoint subclass should be
   * designed such that it is responsible for performing a single operation.
   *
   * (ie. the registerUser() instance method of the UserEndpoints subclass is
   * responsible for handling the RegisterUser operation)
   *
   * @param {MessageDTO} message
   * @return {MessageDTO}
   * @memberof BaseEndpoints
   */
  async handle(message: MessageDTO): Promise<MessageDTO> {
    const clazz = this.constructor.name;
    log.info(clazz + ' received request message', message);

    // check if operation exists
    if (this.handlers[message.$operation] === undefined) {
      log.info(this.handlers);
      throw new Error('Unsupported operation: ' + message.$operation);
    }

    // dispatch the message to the handler for the message's operation
    try {
      const response = await this.handlers[message.$operation](message);
      log.info(clazz + ' returning response message', response);
      return response;
    } catch (err) {
      log.error(err.stack);
      throw new Error('Unexpected error');
    }
  }
}
