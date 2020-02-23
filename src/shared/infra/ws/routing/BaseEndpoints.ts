import {ServiceOperations} from './ServiceOperations';
import {MessageDTO} from '../../../dtos/MessageDTO';

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
  handlers;

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
  handle(message: MessageDTO): MessageDTO {
    // steps
    // receive request in world server
    // dispatch request to world endpoints
    // now goal is finding which endpoints to dispatch request to
    // does request need authentication? (any service besides user services at this point)
    // check if jwt is valid
    // dispatch request to endpoint
  }
}
