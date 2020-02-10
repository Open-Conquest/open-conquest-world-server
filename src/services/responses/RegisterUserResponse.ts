import {Response} from '../../Response';
import { ServiceNames } from '../ServiceNames';
import { ServiceOperations } from '../ServiceOperations';
import { User } from 'src/domain/User';

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
  constructor(user: User) {
    super(
        ServiceNames.User,
        ServiceOperations.RegisterUser,
        new RegisterUserResponseData(user),
    );
  }

  getData(): RegisterUserResponseData {
    return this.data;
  }
}

export class RegisterUserResponseData {
  public username: string;
  constructor(user: User) {
    this.username = user.getUsername(); 
  }
}
