import {ITileRepository} from '../../repos/ITileRepository';
import {IMapRepository} from '../../repos/IMapRepository';
import {Tile} from '../../domain/Tile';
import {GetTileForNewCityErrors} from './GetTileForNewCityErrors';
import {log} from '../../../../shared/utils/log';
import {TileType} from '../../domain/TileType';

/**
 * Use an algorithm to get the best tile to create a new city at.
 *
 * @export
 * @class GetTileForNewCityService
 */
export class GetTileForNewCityService {
  private tileRepository: ITileRepository;
  private mapRepository: IMapRepository;

  /**
   * Creates an instance of GetTileForNewCityService.
   *
   * @param {ITileRepository} tileRepository
   * @param {IMapRepository} mapRepository
   * @memberof CityServices
   */
  constructor(tileRepository: ITileRepository, mapRepository: IMapRepository) {
    this.tileRepository = tileRepository;
    this.mapRepository = mapRepository;
  }

  /**
   * Get the best tile to create a city for a new player at.
   *
   * @return {Promise<Tile>}
   * @memberof CityServices
   */
  async getTile(): Promise<Tile> {
    // TODO: implement algorithm to select the best tile

    // for now just select a random position
    const map = await this.mapRepository.getMap();
    // try 10 times to get a random tile
    let tile: Tile = null;
    let attempts = 0;
    while (attempts < 10) {
      const row = Math.floor((Math.random() * map.$maxRows));
      const col = Math.floor((Math.random() * map.$maxCols));
      log.info('row, col', row);
      log.info('row, col', col);
      tile = await this.tileRepository.getTileAt(row, col);
      // if found a grass tile, then return because i said so
      if (tile.$type === TileType.Grass) {
        return tile;
      }
      attempts += 1;
    }
    throw new Error(GetTileForNewCityErrors.TooManyAttempts);
  }
}
