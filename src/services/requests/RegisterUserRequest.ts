import {Request} from '../../Request';
import {ServiceNames} from '../ServiceNames';
import {ServiceOperations} from '../ServiceOperations';
import {User} from 'src/domain/User';
import {EntityId} from 'src/domain/Entity';

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

  /**
   * Return the user from this request.
   *
   * @return {User}
   * @memberof RegisterUserRequest
   */
  getUser(): User {
    return new User(new EntityId(0), 'username');
  }
}
