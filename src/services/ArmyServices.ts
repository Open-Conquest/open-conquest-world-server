import {BaseServices} from './BaseServices';
import {Response} from '../Response';
import {Request} from '../Request';
import {ArmyRepository} from '../repos/implementations/ArmyRepository';
import {Army} from '../domain/Army';

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
   * @param {Request} request
   * @return {Promise<Array<Army>>}
   * @memberof ArmyServices
   */
  async getArmy(): Promise<any> {
    const armyRepository = this.armyRepository;
    return new Promise( function(resolve, reject) {
      armyRepository.getAllArmies()
          .then((armies) => {
            const response = new Response('army', 'get', armies);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
