/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/utils/log';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {createTestWorld} from '../../../../scripts/createTestWorld';
import {getWorldController} from '../../../../../../src/modules/game/services/getWorld';
import {GetWorldResponseDTO} from '../../../../../../src/modules/game/services/getWorld/GetWorldResponseDTO';
import {GetWorldErrorResponseDTO} from '../../../../../../src/modules/game/services/getWorld/GetWorldErrorResponseDTO';


/**
 * Summary of tests for GetWorldController:getWorld
 * 1. Should get a DTO with the expected world response
 */
describe('GetWorldController:getWorld', function() {
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

    // make request to PlayeEndpoints
    const response = await getWorldController.getWorld();

    if (response instanceof GetWorldErrorResponseDTO) {
      assert.fail('Expected GetWorldResponseDTO get error response instead.');
    } else {
      const world = response.$world;
      // assert world has expected map
      const map = world.$map;
      const tiles = map.$tiles;
      const expectedTiles = expectedWorld.$map.$tiles;
      for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
          assert(tiles[row][col].$col === expectedTiles[row][col].$col);
          assert(tiles[row][col].$row === expectedTiles[row][col].$row);
          assert(tiles[row][col].$type === expectedTiles[row][col].$type);
        }
      }
      // assert world has expected cities
      const cities = world.$cities;
      const expectedCities = expectedWorld.$cities;
      for (let i = 0; i < cities.length; i++) {
        assert(cities[i].$name === expectedCities[i].$name.$value);
        assert(cities[i].$row === expectedCities[i].$row);
        assert(cities[i].$col === expectedCities[i].$col);
        assert(cities[i].$level === expectedCities[i].$level.$value);
      }
      // assert world has expected players
      const players = world.$players;
      const expectedPlayers = expectedWorld.$players;
      expect(players.length).to.be.above(0);
      for (let i = 0; i < players.length; i++) {
        assert(players[i].$name === expectedPlayers[i].$name.$value);
        expect(players[i].$playerID).to.equal(expectedPlayers[i].$id.$value);
      }
    }
  });
});
