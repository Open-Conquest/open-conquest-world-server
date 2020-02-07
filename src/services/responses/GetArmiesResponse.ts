import { Response } from "../../Response";
import {Army} from '../../domain/Army';
import {User} from '../../domain/User';
import { ServiceNames } from "../ServiceNames";
import { ServiceOperations } from "../ServiceOperations";

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
    super(ServiceNames.Army, ServiceOperations.GetArmies, data);
    this.user = user;
    this.armies = armies;
  }
}
