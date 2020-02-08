import {BaseServices} from './BaseServices';
import {Response} from '../Response';
import {Request} from '../Request';
import {ArmyRepository} from '../repos/implementations/ArmyRepository';
import {Army} from '../domain/Army';
import {GetArmiesResponse} from './responses/GetArmiesResponse';
import {User} from '../domain/User';
import {EntityId} from '../domain/Entity';
import { ServiceNames } from './ServiceNames';
import { IArmyRepository } from '../repos/IArmyRepository';

/**
 *
 *
 * @export
 * @class ArmyServices
 * @extends {BaseServices}
 */
export class ArmyServices extends BaseServices {
  private armyRepository: IArmyRepository;

  /**
   * Creates an instance of ArmyServices.
   * @param {ArmyRepository} armyRepository
   * @memberof ArmyServices
   */
  constructor(armyRepository: IArmyRepository) {
    super();
    this.armyRepository = armyRepository;
    this.serviceName = ServiceNames.Army;
    this.handlers = {
      'get': this.getArmies,
    };
  }

  /**
   * Returns an array of the user's `Army`s.
   *
   * @param {User} user
   * @return {Promise<Array<Army>>}
   * @memberof ArmyServices
   */
  async getArmies(user: User): Promise<any> {
    const armyRepository = this.armyRepository;
    return new Promise( function(resolve, reject) {
      armyRepository.getAllArmies(user)
          .then((armies) => {
            const response = new GetArmiesResponse(user, armies);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
