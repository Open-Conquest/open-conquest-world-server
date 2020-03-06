/* eslint-disable max-len */
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ArmyRepositoryErrors} from '../../../../../../src/modules/game/repos/ArmyRepositoryErrors';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';
import {createTestPlayer} from '../../../../scripts/createTestPlayer';
import {armyRepository} from '../../../../../../src/modules/game/repos/implementations';

/**
 * Summary of tests for ArmyRepository:createArmy
 * 1. Should create expected army for player
 * 2. Should throw NonexistentPlayer error
 */
describe('ArmyRepository:createArmy', function() {
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
  it('Should create expected army for player', async function() {
    const player = await createTestPlayer();

    const army = armyFactory.createDefaultArmy();
    army.$playerID = player.$id;

    const createdArmy = await armyRepository.createArmy(
        player,
        army,
    );

    // assert army have expected values
    assert(createdArmy.$playerID.$value === army.$playerID.$value,
        'Unexpected player id');
  });

  // 2.
  it('Should throw NonexistentPlayer error', async function() {
    const player = playerFactory.createPlayer(
        -1,
        'nonexistentplayer',
    );

    const army = armyFactory.createDefaultArmy();
    army.$playerID = player.$id;

    try {
      await armyRepository.createArmy(
          player,
          army,
      );
      assert.fail('Expected NonexistentPlayer error');
    } catch (err) {
      assert(err.message === ArmyRepositoryErrors.NonexistentPlayer);
    }
  });
});
