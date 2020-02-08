import {March} from '../../domain/March';
import { IMarchRepository } from '../IMarchRepository';

/**
 * A Sequelize implementation of the `IMarchRepository`
 * @class MarchRepository
 */
export class MarchRepository implements IMarchRepository {
  private models: any;

  /**
   * Creates an instance of MarchRepository.
   * @param {*} models
   * @memberof MarchRepository
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Gets all of the marches in this world.
   * @return {Promise<Array<March>>}
   * @memberof MarchRepository
   */
  getAllMarches(): Promise<Array<March>> {
    const models = this.models;
    return new Promise( function(resolve, reject) {
      models.march.findAll({
        include: ['startTile', 'endTile'],
      })
          .then((marches) => {
            resolve(marches);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
