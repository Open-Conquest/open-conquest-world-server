import {BaseServices} from './BaseServices';
import {Response} from '../Response';
import {Request} from '../Request';
import {ArmyRepository} from '../repos/implementations/ArmyRepository';
import {Army} from '../domain/Army';
import {GetAllArmiesResponse} from '../GetAllArmiesResponse';
import {User} from '../domain/User';
import {EntityId} from '../domain/Entity';

/**
 *
 *
 * @export
 * @class ArmyServices
 * @extends {BaseServices}
 */
export class ArmyServices extends BaseServices {
  private armyRepository: ArmyRepository

  /**
   * Creates an instance of ArmyServices.
   * @param {ArmyRepository} armyRepository
   * @memberof ArmyServices
   */
  constructor() {
    super();
    this.armyRepository = new ArmyRepository();
    this.service = 'army';
    this.handlers = {
      'get': this.getArmy,
    };
  }

  /**
   * Returns an array of `Army`.
   *
   * @param {User} user
   * @return {Promise<Array<Army>>}
   * @memberof ArmyServices
   */
  async getArmy(user: User): Promise<any> {
    const armyRepository = this.armyRepository;
    return new Promise( function(resolve, reject) {
      armyRepository.getAllArmies()
          .then((armies) => {
            // todo remove just for testing rn
            const userId = new EntityId(100);
            const user = new User(userId);
            const response = new GetAllArmiesResponse(user, armies);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
