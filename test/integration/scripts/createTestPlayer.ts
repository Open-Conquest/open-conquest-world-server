import {Player} from '../../../src/modules/game/domain/Player';
import {PlayerFactory} from '../../../src/modules/game/factories/PlayerFactory';
import {User} from '../../../src/modules/user/domain/User';
import {Playername} from '../../../src/modules/game/domain/Playername';
import {log} from '../../../src/shared/utils/log';
import {createTestUser} from './createTestUser';
import {createPlayerService} from '../../../src/modules/game/services/createPlayer';
/**
 * Reusable script to create a new player to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestPlayer(): Promise<Player> {
  const user = await createTestUser();

  // create a new player for the user
  const playername = 'test_playername';
  const player = new Player(
      null,
      new Playername(playername),
  );
  return await createPlayerService.createPlayer(user, player);
}
