const {AsyncLocalStorage} = require('async_hooks');
import {log} from '../../utils/log';

/**
 * BaseRepository
 */
export class BaseRepository {
  protected asyncLocalStorage: any;

  /**
   * Creates an instance of BaseRepository.
   * @memberof BaseRepository
   */
  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();
  }
}
