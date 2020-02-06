import { Response } from "./Response";
import {Army} from './domain/Army';
import {User} from './domain/User';

/**
 *
 *
 * @export
 * @class GetAllArmiesResponse
 * @extends {Response}
 */
export class GetArmiesResponse extends Response {
  private user: User;
  private armies: Array<Army>;
  /**
   * Creates an instance of GetAllArmiesResponse.
   *
   * @param {User} user
   * @param {Array<Army>} armies
   * @memberof GetAllArmiesResponse
   */
  constructor(user: User, armies: Array<Army>) {
    const data = {
      'user': user,
      'armies': armies,
    };
    super('army', 'getall', data);
    this.user = user;
    this.armies = armies;
  }
}
