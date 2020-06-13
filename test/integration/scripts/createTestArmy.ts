import {Player} from '../../../src/modules/game/domain/Player';
import {Army} from '../../../src/modules/game/domain/Army';
import {log} from '../../../src/shared/utils/log';
import {createArmyService} from '../../../src/modules/game/services/createArmy';
import {createTestPlayer} from './createTestPlayer';

/**
 * Reusable script to create a new player to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestArmy(): Promise<Army> {
  // create a new test army with no units
  const army = new Army(
      null,
      [],
  );
  return await createArmyService.createArmy(army);
}
