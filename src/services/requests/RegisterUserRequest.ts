import {Request} from '../../Request';
import {IRequestData} from '../../Request';
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
    data = new RegisterUserRequestData(data);
    super(ServiceNames.User, ServiceOperations.RegisterUser, data);
  }
}

/**
 * Data class for RegisterUserRequest.
 *
 * @export
 * @class RegisterUserRequestData
 * @extends {RequestData}
 */
export class RegisterUserRequestData implements IRequestData {
  /**
   * Creates an instance of RegisterUserRequestData.
   *
   * @param {*} data
   * @memberof RegisterUserRequestData
   */
  constructor(data: any) {}

  /**
   *
   *
   * @memberof RegisterUserRequestData
   */
  toJson() {}

  /**
   *
   *
   * @param {*} json
   * @memberof RegisterUserRequestData
   */
  fromJson(json: any) {}
}
