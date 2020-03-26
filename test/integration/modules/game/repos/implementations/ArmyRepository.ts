/* eslint-disable max-len */
import {ArmyFactory} from '../../../../../../src/modules/game/factories/ArmyFactory';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {ArmyRepositoryErrors} from '../../../../../../src/modules/game/repos/ArmyRepositoryErrors';
import {armyRepository} from '../../../../../../src/modules/game/repos/implementations';

import * as chai from 'chai';
import * as mocha from 'mocha';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

const assert = chai.assert;
const expect = chai.expect;

const armyFactory = new ArmyFactory();
const playerFactory = new PlayerFactory();

/**
 * Summary of tests for ArmyRepository:createArmy
 * 1. Should create expected army in database
 */
describe('ArmyRepository:createArmy', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create expected army in database', async function() {
    // create army entity
    const army = armyFactory.createDefaultArmy();

    // save army to database
    const createdArmy = await armyRepository.createArmy(army);

    // assert army have expected values
    expect(createdArmy.$id.$value).to.be.above(0);
  });
});
