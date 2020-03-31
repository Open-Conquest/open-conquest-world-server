/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {marchEndpoints} from '../../../../../src/modules/game/endpoints';
import {createTestUser} from '../../../scripts/createTestUser';
import {PlayerDTO} from '../../../../../src/modules/game/dtos/PlayerDTO';
import {UserDTO} from '../../../../../src/modules/user/dtos/UserDTO';
import { UnitType, UnitName, UnitAttack, UnitDefense, UnitGoldCost } from '../../../../../src/modules/game/domain/Unit';
import {createTestWorld} from '../../../scripts/createTestWorld';
import {createTestPlayerWithArmyForUser} from '../../../scripts/createTestPlayerWithArmyForUser';
import {MarchMapper} from '../../../../../src/modules/game/mappers/MarchMapper';
import {MarchFactory} from '../../../../../src/modules/game/factories/MarchFactory';
import {Time} from '../../../../../src/modules/game/domain/Time';
import {CreateMarchRequestDTO} from '../../../../../src/modules/game/services/createMarch/CreateMarchRequestDTO';
import { MarchDTO } from '../../../../../src/modules/game/dtos/MarchDTO';


const marchMapper = new MarchMapper();
const marchFactory = new MarchFactory();

/**
 * Summary of tests for PlayerEndpoints:createPlayer
 * 1. Should get a DTO with a new player & their army, resources, and army
 */
describe('MarchEndpoints:createMarch', function() {
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
    // create entites
    const world = await createTestWorld();
    const user = await createTestUser();
    const player = await createTestPlayerWithArmyForUser(user);
    const march = marchFactory.createMarch(
        null, player.$army, 0, 0, 5, 5, new Time(''),
    );

    // create dtos
    const userDTO = new UserDTO(user.$id.$value, user.$username.$value);
    const playerDTO = new PlayerDTO(player.$id.$value, player.$name.$value);
    const marchDTO = marchMapper.toDTO(march);
    const createMarchDTO = new CreateMarchRequestDTO(playerDTO, marchDTO);

    // create request dto
    const message = new MessageDTO(
        ServiceNames.March,
        ServiceOperations.CreateMarch,
        null,
        userDTO,
        createMarchDTO,
    );

    // make request to MarchEndpoints
    const createMarchResponseDTO = await marchEndpoints.createMarch(message);

    // assert message has expected service,operation properties
    expect(createMarchResponseDTO.$service)
        .to.equal(ServiceNames.March);
    expect(createMarchResponseDTO.$operation)
        .to.equal(ServiceOperations.CreateMarch);

    // assert march has expected properties
    const data = createMarchResponseDTO.$data;
    const marchData = data.march;
    expect(marchData.marchID).to.be.above(0);
    expect(marchData.startRow).to.equal(0);
    expect(marchData.startCol).to.equal(0);
    expect(marchData.endRow).to.equal(5);
    expect(marchData.endCol).to.equal(5);

    // assert created march has all the expected units
    const createdMarchDTO = MarchDTO.fromJSON(marchData);
    const createdMarch = marchMapper.fromDTO(createdMarchDTO);
    const createdMarchArmy = createdMarch.$army;
    for (let i = 0; i < march.$army.$units.length; i++) {
      const type = march.$army.$units[i].$unit.$type;
      const expectedNumUnits = march.$army.numberOfUnits(type);
      expect(createdMarchArmy.numberOfUnits(type)).to.equal(expectedNumUnits);
    }
  });
});
