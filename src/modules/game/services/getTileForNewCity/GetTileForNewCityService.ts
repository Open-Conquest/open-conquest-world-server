import {ITileRepository} from '../../repos/ITileRepository';
import {Tile} from '../../domain/Tile';
import {log} from '../../../../shared/utils/log';


/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class GetTileForNewCityService
 */
export class GetTileForNewCityService {
  private tileRepository: ITileRepository;

  /**
   * Creates an instance of GetTileForNewCityService.
   *
   * @param {ITileRepository} tileRepository
   * @memberof CityServices
   */
  constructor(tileRepository: ITileRepository) {
    this.tileRepository = tileRepository;
  }

  /**
   * Get the best tile to create a city for a new player at.
   *
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async getTile(): Promise<Tile> {
    // TODO:
    // implement algorithm to select the best tile
  }
}
