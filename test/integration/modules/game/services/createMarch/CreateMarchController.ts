/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {March} from '../../../../../../src/modules/game/domain/March';
import {MarchFactory} from '../../../../../../src/modules/game/factories/MarchFactory';
import {CreateMarchErrors} from '../../../../../../src/modules/game/services/createMarch/CreateMarchErrors';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createMarchController} from '../../../../../../src/modules/game/services/createMarch';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {createTestPlayerWithArmyForUser} from '../../../../scripts/createTestPlayerWithArmyForUser';
import {createTestUser} from '../../../../scripts/createTestUser';
import {MarchMapper} from '../../../../../../src/modules/game/mappers/MarchMapper';
import {UserMapper} from '../../../../../../src/modules/game/mappers/UserMapper';
import {CreateMarchRequestDTO} from '../../../../../../src/modules/game/services/createMarch/CreateMarchRequestDTO';
import {PlayerMapper} from '../../../../../../src/modules/game/mappers/PlayerMapper';
import {CreateMarchResponseDTO} from '../../../../../../src/modules/game/services/createMarch/CreateMarchResponseDTO';

const marchFactory = new MarchFactory();
const playerFactory = new PlayerFactory();
const marchMapper = new MarchMapper();
const userMapper = new UserMapper();
const playerMapper = new PlayerMapper();

const assert = chai.assert;
const expect = chai.expect;

/**
 * Summary of tests for CreateMarchController:createMarch
 * 1. Should create the expected march for the player
 * 2. Should throw UnauthorizedUser error
 * 3. Should throw InsufficientUnits error
 * 4. Should throw NonexistentPlayer error
 * 5. Should throw NonexistentTile error
 */

describe('CreateMarchController:createMarch', function() {
  // Start transaction before each test & rollback changes made while testing
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should create the expected march for the player', async function() {
    // create player to create the march for
    await createTestWorld();
    const user = await createTestUser();
    const player = await createTestPlayerWithArmyForUser(user);
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, null,
    );
    const userDTO = userMapper.toDTO(user);
    const playerDTO = playerMapper.toDTO(player);
    const marchDTO = marchMapper.toDTO(march);
    const requestDTO = new CreateMarchRequestDTO(playerDTO, marchDTO);

    // make request
    const response = await createMarchController.createMarch(
        userDTO, requestDTO,
    );

    if (response instanceof CreateMarchResponseDTO) {
      const createdMarch = response.$march;
      // assert created march has expected values
      expect(createdMarch.$startCol).to.equal(0);
      expect(createdMarch.$startRow).to.equal(0);
      expect(createdMarch.$endCol).to.equal(5);
      expect(createdMarch.$endRow).to.equal(5);
      // expect(createdMarch.$army.$id.$value).not.to.equal(player.$army.$id.$value);
      // check that all of the expected units are in the march
      for (let i = 0; i < march.$army.$units.length; i++) {
        const type = march.$army.$units[i].$unit.$type;
        // expect(march.$army.numberOfUnits(type)).to.equal(createdMarch.$army.numberOfUnits(type));
      }
    } else {
      assert.fail('Expected CreatedMarchReponseDTO');
    }


  });
});
