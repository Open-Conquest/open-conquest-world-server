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
 * Summary of tests for PlayerEndpoints:createPlayer
 * 1. Should get a DTO with a new player & their army, resources, and army
 */
describe('PlayerEndpoints:createPlayer', function() {
  const assert = chai.assert;
  const expect = chai.expect;

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
        null,
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
    expect(createPlayerResponseDTO.$service)
        .to.equal(ServiceNames.Player);
    expect(createPlayerResponseDTO.$operation)
        .to.equal(ServiceOperations.CreatePlayer);

    // assert player has expected name
    const data = createPlayerResponseDTO.$data;
    assert(data.player.name === playerDTO.$name,
        'Unexpected player name');

    // assert city has expected properties
    assert(data.city.name === playerDTO.$name,
        'Unexpected city name');
    assert(data.city.level === 1,
        'Unexpected city level');
    assert(data.city.row < map.$maxRows,
        'Unexpected city row > maxRows');
    assert(data.city.col < map.$maxCols,
        'Unexpected city col > maxCols');
    assert(data.city.row >= 0,
        'Unexpected city row < 0');
    assert(data.city.col >= 0,
        'Unexpected city col < 0');

    // assert army equals the default army for a new player
    const armyUnits = data.army.units;
    assert(armyUnits[0].count === 10,
        'Unexpected armyunits count');
    assert(armyUnits[0].unit.type === UnitType.Wizard,
        'Unexpected armyunits type');
    assert(armyUnits[0].unit.name === UnitName.Wizard,
        'Unexpected armyunits name');
    assert(armyUnits[0].unit.attack === UnitAttack.Wizard,
        'Unexpected armyunits attack');
    assert(armyUnits[0].unit.defense === UnitDefense.Wizard,
        'Unexpected armyunits defense');
    assert(armyUnits[0].unit.goldCost === UnitGoldCost.Wizard,
        'Unexpected armyunits goldcost');

    // assert user has the expected starting resources
    assert(data.resources.gold === 100,
        'Unexpected resources gold');
  });
});
