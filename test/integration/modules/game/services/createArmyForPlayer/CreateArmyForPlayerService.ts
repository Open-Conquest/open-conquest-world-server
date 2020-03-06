/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {createArmyForPlayerService} from '../../../../../../src/modules/game/services/createArmyForPlayer';
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {Player} from '../../../../../../src/modules/game/domain/Player';
import {CreateArmyForPlayerServiceErrors} from '../../../../../../src/modules/game/services/createArmyForPlayer/CreateArmyForPlayerServiceErrors';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';

/**
 * Summary of tests for CreateAmryForPlayerService:createArmy
 */

describe('CreateArmyForPlayerService:createArmy', function() {
  const assert = chai.assert;

  const armyFactory = new ArmyFactory();
  const playerFactory = new PlayerFactory();

  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create the expected army', async function() {
    const player: Player = await createTestPlayer();

    const army = armyFactory.createArmy(
        null,
        player.$id.$value,
    );

    const createdArmy = await createArmyForPlayerService.createArmy(player, army);

    // do something to test the created army
  });

  // 2.
  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );
    const army = armyFactory.createDefaultArmy();
    try {
      const createdResources = await createArmyForPlayerService
          .createArmy(
              player,
              army,
          );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === CreateArmyForPlayerServiceErrors.NonexistentPlayer);
    }
  });
});
