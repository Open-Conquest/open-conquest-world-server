/* eslint-disable max-len */
import {Player} from '../../../src/modules/game/domain/Player';
import {Playername} from '../../../src/modules/game/domain/Playername';
import {createTestUser} from './createTestUser';
import {createPlayerService} from '../../../src/modules/game/services/createPlayer';
import {createArmyService} from '../../../src/modules/game/services/createArmy';
import {ArmyFactory} from '../../../src/modules/game/factories/ArmyFactory';
import {addArmyToPlayerService} from '../../../src/modules/game/services/addArmyToPlayer';
import {armyRepository} from '../../../src/modules/game/repos/implementations';

/**
 * Reusable script to create a new player with an army
 * to use in integration tests.
 * @return {Player}
 */
export async function createTestPlayerWithArmy(): Promise<Player> {
  const armyFactory = new ArmyFactory();

  // create army in database for player
  const defaultArmy = armyFactory.createDefaultArmyWithUnits();
  const army = await createArmyService.createArmyWithUnits(
      defaultArmy, defaultArmy.$units,
  );

  // create a new user
  const user = await createTestUser();

  // create a new player
  const playername = 'test_playername';
  let player = new Player(
      null,
      new Playername(playername),
  );
  // create player in database with army
  player = await createPlayerService.createPlayer(
      user, player,
  );

  // add army to player in database
  await addArmyToPlayerService.addArmyToPlayer(army, player);

  // get the player's army
  player.$army = await armyRepository.getArmyForPlayer(player);

  // return created player with armies
  return player;
}
