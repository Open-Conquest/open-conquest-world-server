import {Response} from '../../Response';
import { ServiceNames } from '../ServiceNames';
import { ServiceOperations } from '../ServiceOperations';

/**
 *
 *
 * @export
 * @class RegisterUserResponse
 * @extends {Response}
 */
export class RegisterUserResponse extends Response {
  /**
   * Creates an instance of RegisterUserResponse.
   *
   * @memberof RegisterUserResponse
   */
  constructor() {
    super(ServiceNames.User, ServiceOperations.RegisterUser, null);
  }
}
