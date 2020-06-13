/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {createTestWorld} from '../../../scripts/createTestWorld';
import {GetWorldRequestDTO} from '../../../../../src/modules/game/services/getWorld/GetWorldRequestDTO';
import {worldEndpoints} from '../../../../../src/modules/game/endpoints';
import {GetWorldResponseDTO} from '../../../../../src/modules/game/services/getWorld/GetWorldResponseDTO';
import {GetWorldErrorResponseDTO} from '../../../../../src/modules/game/services/getWorld/GetWorldErrorResponseDTO';

/**
 * Summary of tests for WorldEndpoints:getWorld
 * 1. Should get a DTO with the expected world response
 */
describe('WorldEndpoints:getWorld', function() {
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

  // 1.
  it('Should get a DTO with the expected world response', async function() {
    // create a test world with the expected map, players, cities, etc.
    const expectedWorld = await createTestWorld();

    const getWorldDTO = new GetWorldRequestDTO(1);
    const message = new MessageDTO(
        ServiceNames.World,
        ServiceOperations.GetWorld,
        null,
        null,
        getWorldDTO,
    );

    // make getWorld request to WorldEndpoints
    const responseMessage = await worldEndpoints.getWorld(message);
    const response: GetWorldResponseDTO = responseMessage.$data;

    // assert response contains the expected map, cities, and players
    if (response instanceof GetWorldErrorResponseDTO) {
      assert.fail('Expected GetWorldResponseDTO get error response instead.');
    } else {
      const world = response.$world;
      // assert world has expected map
      const map = world.$map;
      const tiles = map.$tiles;
      const expectedTiles = expectedWorld.$map.$tiles;
      assert(tiles.length > 0,
          'Unexpected tiles length < 0');
      for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
          assert(tiles[row][col].$col === expectedTiles[row][col].$col,
              'Unexpected tile col');
          assert(tiles[row][col].$row === expectedTiles[row][col].$row,
              'Unexpected tile row');
          expect(tiles[row][col].type).to.be.equal(expectedTiles[row][col].$type);
        }
      }
      // assert world has expected cities
      const cities = world.$cities;
      const expectedCities = expectedWorld.$cities;
      assert(cities.length > 0,
          'Unexpected ');
      for (let i = 0; i < cities.length; i++) {
        assert(cities[i].$name === expectedCities[i].$name.$value,
            'Unexpected city name');
        assert(cities[i].$row === expectedCities[i].$row,
            'Unexpected city row');
        assert(cities[i].$col === expectedCities[i].$col,
            'Unexpected city col');
        assert(cities[i].$level === expectedCities[i].$level.$value,
            'Unexpected city level');
      }
      // assert world has expected players
      const players = world.$players;
      const expectedPlayers = expectedWorld.$players;
      assert(players.length > 0,
          'Unexpected players length 0');
      for (let i = 0; i < players.length; i++) {
        assert(players[i].$name === expectedPlayers[i].$name.$value,
            'Unexpected player name');
      }
    }
  });
});
