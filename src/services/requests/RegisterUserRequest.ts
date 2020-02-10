import {Request} from '../../Request';
import {ServiceNames} from '../ServiceNames';
import {ServiceOperations} from '../ServiceOperations';
import {User} from '../../domain/User';
import {EntityId} from '../../domain/Entity';

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
    this.data = RegisterUserRequestData.fromJSON(data);
  }

  /**
   * Return the user from this request.
   *
   * @return {User}
   * @memberof RegisterUserRequest
   */
  getUser(): User {
    return new User(new EntityId(0), this.data.username);
  }
}

/**
 * Class to encapsulate data for RegisterUserRequest.
 *
 * @export
 * @class RegisterUserRequestData
 */
export class RegisterUserRequestData {
  public username: string;
  public password: string;

  /**
   * Creates an instance of RegisterUserRequestData.
   *
   * @param {string} username
   * @param {string} password
   * @param {password} email
   * @memberof ReqisterUserRequestData
   */
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  /**
   * Create an instance of this class from some JSON.
   *
   * @static
   * @param {*} json
   * @return {RegisterUserRequestData}
   * @memberof RegisterUserRequestData
   */
  static fromJSON(json: any) {
    return new RegisterUserRequestData(
        json['username'],
        json['password'],
    );
  }
}
