import {Request} from '../../Request';
import {ServiceNames} from '../ServiceNames';
import {ServiceOperations} from '../ServiceOperations';

/**
 *
 *
 * @export
 * @class RegisterUserRequest
 * @extends {Request}
 */
export class RegisterUserRequest extends Request {
  /**
   * Creates an instance of RegisterUserRequest.
   *
   * @param {any} data
   * @memberof RegisterUserRequest
   */
  constructor(data: any) {
    super(ServiceNames.User, ServiceOperations.RegisterUser, data);
  }
}
