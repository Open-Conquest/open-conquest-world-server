import {log} from '../../../src/shared/utils/log';
import {
  mapRepository,
  tileRepository,
} from '../../../src/modules/game/repos/implementations/';
import {Map} from '../../../src/modules/game/domain/Map';
import {MapFactory} from '../../../src/modules/game/factories/MapFactory';
import {TileFactory} from '../../../src/modules/game/factories/TileFactory';
import {TileType} from '../../../src/modules/game/domain/TileType';

/**
 * Reusable script to create a new map to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestMapWithTiles(): Promise<Map> {
  const rows = 5;
  const cols = 5;

  // create new map and add to database
  const mapFactory = new MapFactory();
  let map = mapFactory.createMap(
      1,
      'World #1',
      rows,
      cols,
  );
  map = await mapRepository.createMap(map);

  // create tiles for the map
  const tileFactory = new TileFactory();
  for (let row = 0; row < map.$maxRows; row++) {
    for (let col = 0; col < map.$maxCols; col++) {
      const tile = tileFactory.createTile(
          null,
          map.$id.$value,
          row,
          col,
          TileType.Grass,
      );
      await tileRepository.createTile(tile);
    }
  }

  // get all of the created tiles for the map
  const tiles = await tileRepository.getAllTiles(map);
  map.$tiles = tiles;

  return map;
}
