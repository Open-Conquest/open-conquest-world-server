import {March} from '../../domain/March';
import {models} from '../../models';

/**
 * A Sequelize implementation of the `IMarchRepository`
 * @class MarchRepository
 */
export class MarchRepository {
  /**
   * Creates an instance of MarchRepository.
   * @memberof MarchRepository
   */
  constructor() {}

  /**
   * Gets all of the marches in this world.
   * @return {Promise<Array<March>>}
   * @memberof MarchRepository
   */
  getAllMarches(): Promise<Array<March>> {
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
