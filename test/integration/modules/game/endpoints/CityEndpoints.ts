import {assert, expect} from 'chai';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {cityEndpoints} from '../../../../../src/modules/game/endpoints';
import {createTestUser} from '../../../scripts/createTestUser';
import {PlayerDTO} from '../../../../../src/modules/game/dtos/PlayerDTO';
import {UserDTO} from '../../../../../src/modules/user/dtos/UserDTO';
import { createTestWorld } from '../../../scripts/createTestWorld';
import { createTestPlayerWithCityForUser } from '../../../scripts/createTestPlayerWithCityForUser';
import { GetCitiesRequestDTO } from '../../../../../src/modules/game/services/getCities/GetCitiesRequestDTO';
import { GetCitiesResponseDTO } from '../../../../../src/modules/game/services/getCities/GetCitiesResponseDTO';
import { CityDTO } from '../../../../../src/modules/game/dtos/CityDTO';

describe('CityEndpoints:getCities', function() {
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

  it('Should get a list of cities for a player', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create a player with cities
    const user = await createTestUser();
    const player = await createTestPlayerWithCityForUser(user);

    // Build DTOs
    const userDTO = new UserDTO(user.$id.$value, user.$username.$value);
    const playerDTO = new PlayerDTO(player.$id.$value, player.$name.$value);
    const getCitiesDTO = new GetCitiesRequestDTO(playerDTO);
    const message = new MessageDTO(
        ServiceNames.City,
        ServiceOperations.GetCities,
        null,
        userDTO,
        getCitiesDTO,
    );

    // Get response from city endpoints
    const response = await cityEndpoints.getCities(message);

    // Assert that the expected cities were returned
    const responseData: GetCitiesResponseDTO = response.$data;
    const cities: Array<CityDTO> = responseData.cities;
    for (const city of cities) {
      expect(city.$name).to.equal(playerDTO.$name);
      expect(city.$row).to.be.greaterThan(-1);
      expect(city.$row).to.be.lessThan(world.$map.$maxRows);
      expect(city.$col).to.be.greaterThan(-1);
      expect(city.$col).to.be.lessThan(world.$map.$maxCols);
    }
  });
});

describe('CityEndpoints:getCities', function() {
  // Start a transaction before each test then rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('Should get a list of cities for a player', async function() {
    // Initialize a world to run tests in
    const world = await createTestWorld();

    // Create a player with cities
    const user = await createTestUser();
    const player = await createTestPlayerWithCityForUser(user);

    // Build DTOs
    const userDTO = new UserDTO(user.$id.$value, user.$username.$value);
    const playerDTO = new PlayerDTO(player.$id.$value, player.$name.$value);
    const getCitiesDTO = new GetCitiesRequestDTO(playerDTO);
    const message = new MessageDTO(
        ServiceNames.City,
        ServiceOperations.GetCities,
        null,
        userDTO,
        getCitiesDTO,
    );

    // Get response from city endpoints
    const response = await cityEndpoints.getCities(message);

    // Assert that the expected cities were returned
    const responseData: GetCitiesResponseDTO = response.$data;
    const cities: Array<CityDTO> = responseData.cities;
    for (const city of cities) {
      expect(city.$name).to.equal(playerDTO.$name);
      expect(city.$row).to.be.greaterThan(-1);
      expect(city.$row).to.be.lessThan(world.$map.$maxRows);
      expect(city.$col).to.be.greaterThan(-1);
      expect(city.$col).to.be.lessThan(world.$map.$maxCols);
    }
  });
});
