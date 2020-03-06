import {Player} from '../../../src/modules/game/domain/Player';
import {Army} from '../../../src/modules/game/domain/Army';
import {log} from '../../../src/shared/utils/log';
import {createArmyForPlayerService} from '../../../src/modules/game/services/createArmyForPlayer';
import {createTestPlayer} from './createTestPlayer';

/**
 * Reusable script to create a new player to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestArmy(): Promise<Army> {
  const player = await createTestPlayer();

  // create a new test army with no units
  const army = new Army(
      null,
      player.$id,
  );
  return await createArmyForPlayerService.createArmy(player, army);
}
