/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {playerEndpoints} from '../../../../../src/modules/game/endpoints';
import {createTestUser} from '../../../scripts/createTestUser';
import {CreatePlayerRequestDTO} from '../../../../../src/modules/game/services/createPlayer/CreatePlayerRequestDTO';
import {PlayerDTO} from '../../../../../src/modules/game/dtos/PlayerDTO';
import {UserDTO} from '../../../../../src/modules/user/dtos/UserDTO';
import {createTestMapWithTiles} from '../../../scripts/createTestMapWithTiles';
import { UnitType, UnitName, UnitAttack, UnitDefense, UnitGoldCost } from '../../../../../src/modules/game/domain/Unit';

/**
 * Summary of tests for CreatePlayerController:createPlayer
 * 1. Should get a DTO with a new player & their army, resources, and army
 */
describe('PlayerEndpoints:createPlayer', function() {
  const assert = chai.assert;

  /**
   * Start a transaction before each test then rollback any changes after
   * the test finishes running. This ensures that no changes made to the
   * database during the tests are kept.
   */
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1. Should get a DTO with a new player & their army, resources, and army
  it('Should get a DTO with a new player & their army, resources, and army', async function() {
    const map = await createTestMapWithTiles();
    const user = await createTestUser();

    // build CreatePlayerRequest message
    const userDTO = new UserDTO(user.$id.$value, user.$username.$value);
    const playerDTO = new PlayerDTO(
        'test_playername',
    );
    const createPlayerDTO = new CreatePlayerRequestDTO(playerDTO);
    const message = new MessageDTO(
        ServiceNames.Player,
        ServiceOperations.CreatePlayer,
        null,
        userDTO,
        createPlayerDTO,
    );

    // make request to PlayeEndpoints
    const createPlayerResponseDTO = await playerEndpoints.createPlayer(message);

    // assert message has expected service,operation properties
    assert(createPlayerResponseDTO.$service === ServiceNames.Player);
    assert(createPlayerResponseDTO.$operation === ServiceOperations.CreatePlayer);

    // assert player has expected name
    const data = createPlayerResponseDTO.$data;
    assert(data.player.name === playerDTO.$name);

    // assert city has expected properties
    assert(data.city.name === playerDTO.$name);
    assert(data.city.level === 1);
    assert(data.city.row < map.$maxRows);
    assert(data.city.col < map.$maxCols);
    assert(data.city.row >= 0);
    assert(data.city.col >= 0);

    // assert army equals the default army for a new player
    const armyUnits = data.army.units;
    assert(armyUnits[0].count === 10);
    assert(armyUnits[0].unit.type === UnitType.Wizard);
    assert(armyUnits[0].unit.name === UnitName.Wizard);
    assert(armyUnits[0].unit.attack === UnitAttack.Wizard);
    assert(armyUnits[0].unit.defense === UnitDefense.Wizard);
    assert(armyUnits[0].unit.goldCost === UnitGoldCost.Wizard);

    // assert user has the expected starting resources
    assert(data.resources.gold === 100);
  });
});
