import {log} from '../../../src/shared/utils/log';
import {World} from '../../../src/modules/game/domain/World';
import {createTestMapWithTiles} from './createTestMapWithTiles';
import {createTestPlayers} from './createTestPlayers';
import {WorldFactory} from '../../../src/modules/game/factories/WorldFactory';
import {
  cityRepository,
  tileRepository,
} from '../../../src/modules/game/repos/implementations';

/**
 * Reusable script to create a new player to use in integration tests.
 *
 * @export
 * @return {Promise<World>}
 */
export async function createTestWorld(): Promise<World> {
  // create a map for the world
  const map = await createTestMapWithTiles();

  // create players for the world
  const players = await createTestPlayers();

  // get all the players cities
  const cities = await cityRepository.getAllCities();

  // get the updated map with cities added
  map.$tiles = await tileRepository.getAllTiles(map);

  const worldFactory = new WorldFactory();
  return worldFactory.createWorld(
      null,
      players,
      map,
      cities,
  );
}
