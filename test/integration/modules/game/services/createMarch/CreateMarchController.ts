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
import {createTestPlayerWithArmyForUser} from '../../../../scripts/createTestPlayerWithArmyForUser';
import {createTestUser} from '../../../../scripts/createTestUser';
import {MarchMapper} from '../../../../../../src/modules/game/mappers/MarchMapper';
import {UserMapper} from '../../../../../../src/modules/game/mappers/UserMapper';
import {CreateMarchRequestDTO} from '../../../../../../src/modules/game/services/createMarch/CreateMarchRequestDTO';
import {PlayerMapper} from '../../../../../../src/modules/game/mappers/PlayerMapper';
import {CreateMarchResponseDTO} from '../../../../../../src/modules/game/services/createMarch/CreateMarchResponseDTO';
import {Time} from '../../../../../../src/modules/game/domain/Time';
import {createTestUserWithName} from '../../../../scripts/createTestUserWithName';
import {CreateMarchErrorResponses} from '../../../../../../src/modules/game/services/createMarch/CreateMarchController';

const marchFactory = new MarchFactory();
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
    // create entities
    await createTestWorld();
    const user = await createTestUser();
    const player = await createTestPlayerWithArmyForUser(user);
    const startTime = new Time('');
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, startTime,
    );

    // create dtos and request
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
      // check that all of the expected units are in the march
      expect(createdMarch.$army.$units.length).to.equal(march.$army.$units.length);
      for (let i = 0; i < createdMarch.$army.$units.length; i++) {
        const type = createdMarch.$army.$units[i].$unit.$type;
        const count = createdMarch.$army.$units[i].$count;
        expect(count).to.equal(march.$army.numberOfUnits(type));
      }
    } else {
      assert.fail('Expected CreatedMarchReponseDTO');
    }
  });

  it('Should throw UnauthorizedUser error', async function() {
    // create entities
    await createTestWorld();
    const user = await createTestUser();
    // create player for another user
    const anotherUser = await createTestUserWithName('other_user');
    const anotherPlayer = await createTestPlayerWithArmyForUser(anotherUser);
    const player = await createTestPlayerWithArmyForUser(user);
    const startTime = new Time('');
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, startTime,
    );

    // create dtos and request
    const userDTO = userMapper.toDTO(user);
    // create playerdto with another player
    const playerDTO = playerMapper.toDTO(anotherPlayer);
    const marchDTO = marchMapper.toDTO(march);
    const requestDTO = new CreateMarchRequestDTO(playerDTO, marchDTO);

    // make request
    try {
      await createMarchController.createMarch(
          userDTO, requestDTO,
      );
      assert.fail('Expected UnauthorizedUser error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrorResponses.UnauthorizedUser);
    }
  });

  it('Should throw InsufficientUnits error', async function() {
    // create entities
    await createTestWorld();
    const user = await createTestUser();
    const player = await createTestPlayerWithArmyForUser(user);
    const startTime = new Time('');
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, startTime,
    );
    // artificially inflate the number of units in player's army
    const type = march.$army.$units[0].$unit.$type;
    march.$army.$units[0].$count += player.$army.numberOfUnits(type);

    // create dtos and request
    const userDTO = userMapper.toDTO(user);
    const playerDTO = playerMapper.toDTO(player);
    const marchDTO = marchMapper.toDTO(march);
    const requestDTO = new CreateMarchRequestDTO(playerDTO, marchDTO);

    // make request
    try {
      await createMarchController.createMarch(
          userDTO, requestDTO,
      );
      assert.fail('Expected InsufficientUnits error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrorResponses.InsufficientUnits);
    }
  });

  it('Should throw NonexistentTile error', async function() {
    // create entities
    const world = await createTestWorld();
    const user = await createTestUser();
    const player = await createTestPlayerWithArmyForUser(user);
    const march = marchFactory.createMarch(
        null, player.$army,
        0, 0,
        world.$map.$maxRows+1, world.$map.$maxCols+1,
        new Time(''),
    );

    // create dtos and request
    const userDTO = userMapper.toDTO(user);
    const playerDTO = playerMapper.toDTO(player);
    const marchDTO = marchMapper.toDTO(march);
    const requestDTO = new CreateMarchRequestDTO(playerDTO, marchDTO);

    // make request
    try {
      await createMarchController.createMarch(
          userDTO, requestDTO,
      );
      assert.fail('Expected NonexistentTile error');
    } catch (err) {
      expect(err.message).to.equal(CreateMarchErrorResponses.NonexistentTile);
    }
  });
});
