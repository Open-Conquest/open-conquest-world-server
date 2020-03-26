/* eslint-disable max-len */
import {Player} from '../../../src/modules/game/domain/Player';
import {Playername} from '../../../src/modules/game/domain/Playername';
import {createTestUser} from './createTestUser';
import {createPlayerService} from '../../../src/modules/game/services/createPlayer';
import {createArmyService} from '../../../src/modules/game/services/createArmy';
import {ArmyFactory} from '../../../src/modules/game/factories/ArmyFactory';

/**
 * Reusable script to create a new player with an army
 * to use in integration tests.
 * @return {Player}
 */
export async function createTestPlayerWithArmy(): Promise<Player> {
  const armyFactory = new ArmyFactory();

  // create a new user
  const user = await createTestUser();

  // create a new player
  const playername = 'test_playername';
  let player = new Player(
      null,
      new Playername(playername),
  );
  player = await createPlayerService.createPlayer(user, player);

  // create armies for player
  const armies = [];
  const defaultArmy = armyFactory.createDefaultArmyWithUnits();
  const createdArmy = await createArmyService.createArmyWithUnits(
      defaultArmy,
      defaultArmy.$units,
  );
  armies.push(createdArmy);
  player.$armies = armies;

  // return created player with armies
  return player;
}
