import {log} from '../../utils/log';
const logError = require('../../utils/log').logError;
const march = require('../../models').march;

export class MarchRepository {
  constructor() {}

  /**
   * Gets all of the marches in this world.
   *
   * @return
   * @memberof MarchRepository
   */
  getAllMarches() {
    throw new Error('no implmentation');
  }
}
