import {log} from '../../../src/shared/utils/log';
import {Map} from '../../../src/modules/game/domain/Map';
import {mapRepository} from '../../../src/modules/game/repos/implementations/';
import {MapFactory} from '../../../src/modules/game/factories/MapFactory';

/**
 * Reusable script to create a new map to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestMap(): Promise<Map> {
  // create a new player for the user
  const mapFactory = new MapFactory();
  const map = mapFactory.createMap(
      null,
      'World #1',
      10,
      10,
  );
  return await mapRepository.createMap(map);
}
