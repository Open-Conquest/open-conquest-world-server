/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {TileFactory} from '../../../../../../src/modules/game/factories/TileFactory';
import {TileType} from '../../../../../../src/modules/game/domain/TileType';
import {tileRepository} from '../../../../../../src/modules/game/repos/implementations';
import {createTestMap} from '../../../../scripts/createTestMap';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

const tileFactory = new TileFactory();

/**
 * Summary of tests for TileRepository:createTile
 * 1. Should create a tile with the expected properties
 * 2. Should throw error when trying to create tile at row,col that already exists
 */
describe('TileRepository:createTile', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should create a tile with the expected properties', async function() {
    // create a map for the tile to be added to
    const map = await createTestMap();

    // create a tile entity
    const tile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    // try to create tile entity in database
    const actualTile = await tileRepository.createTile(tile);

    assert(actualTile.$mapID.$value === tile.$mapID.$value, 'Unexpected mapID');
    assert(actualTile.$row === tile.$row, 'Unexpected row');
    assert(actualTile.$col === tile.$col, 'Unexpected col');
    assert(actualTile.$type === tile.$type, 'Unexpected type');
  });

  // 2.
  it('Should throw error when trying to create tile at row,col that already exists', async function() {
    // create a map for the tile to be added to
    const map = await createTestMap();

    // create a tile entity
    const tile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    // try to create tile entity in database
    const actualTile = await tileRepository.createTile(tile);

    try {
      await tileRepository.createTile(tile);
      assert.fail('Expected duplicate tile error');
    } catch (err) {
      assert(err.message === 'A tile already exists at row,col');
    }
  });
});

/**
 * Summary of tests for TileRepository:updateTile
 * 1. Should update the tile with the expected properties
 * 2. Should error when updating a nonexistent tile
 */
describe('TileRepository:updateTile', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should update the tile with the expected properties', async function() {
    // create a map for the tile to be added to
    const map = await createTestMap();

    // create a tile entity
    const tile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    // create tile entity in database
    const createdTile = await tileRepository.createTile(tile);

    // update tile entity type to be a city
    createdTile.$type = TileType.City;

    const updatedTile = await tileRepository.updateTile(createdTile);

    assert(updatedTile.$mapID.$value === createdTile.$mapID.$value, 'Unexpected mapID');
    assert(updatedTile.$row === createdTile.$row, 'Unexpected row');
    assert(updatedTile.$col === createdTile.$col, 'Unexpected col');
    assert(updatedTile.$type === TileType.City, 'Unexpected type');
  });

  // 2.
  it('Should error when updating a nonexistent tile', async function() {
    // create a map for the tile to be added to
    const map = await createTestMap();

    // create a tile entity
    const nonexistentTile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    try {
      const updatedTile = await tileRepository.updateTile(nonexistentTile);
      assert.fail('Expected error');
    } catch (err) {
      assert(err.message === 'No tile found');
    }
  });
});

/**
 * Summary of tests for TileRepository:getTile
 * 1. Should get the tile with the expected properties
 */
describe('TileRepository:getTile', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should get the tile with the expected properties', async function() {
    // create map to add tile to
    const map = await createTestMap();

    // create tile entity
    let tile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    // add tile to map
    tile = await tileRepository.createTile(tile);
    // get tile
    const actualTile = await tileRepository.getTile(tile);

    assert(actualTile.$mapID.$value === tile.$mapID.$value, 'Unexpected mapID');
    assert(actualTile.$row === tile.$row, 'Unexpected row');
    assert(actualTile.$col === tile.$col, 'Unexpected col');
    assert(actualTile.$type === tile.$type, 'Unexpected type');
  });
});

/**
 * Summary of tests for TileRepository:getTileAt
 * 1. Should get the tile at row,col
 * 2. Should return null for a row,col that isn't in the map
 */
describe('TileRepository:getTileAt', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should get the tile at row,col', async function() {
    // create map to add tile to
    const map = await createTestMap();

    // create tile entity
    let tile = tileFactory.createTile(
        null,
        map.$id.$value,
        0,
        0,
        TileType.Grass,
    );

    // add tile to map
    tile = await tileRepository.createTile(tile);

    // get tile
    const actualTile = await tileRepository.getTileAt(0, 0);

    assert(actualTile.$mapID.$value === tile.$mapID.$value, 'Unexpected mapID');
    assert(actualTile.$row === tile.$row, 'Unexpected row');
    assert(actualTile.$col === tile.$col, 'Unexpected col');
    assert(actualTile.$type === tile.$type, 'Unexpected type');
  });

  // 2.
  it('Should return null for a row,col that isn\'t on the map', async function() {
    // create map to add tile to
    const map = await createTestMap();

    // get tile
    const actualTile = await tileRepository.getTileAt(-1, -1);

    assert(actualTile === null);
  });
});


/**
 * Summary of tests for TileRepository:getAllTiles
 * 1. Should get all of the expected tile
 */
describe('TileRepository:getAllTiles', function() {
  const assert = chai.assert;

  // Start transaction before each test & rollback any changes after
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1.
  it('Should get all of the expected tiles', async function() {
    // create map
    const map = await createTestMap();

    // add tiles to map
    const tiles = [];
    for (let row = 0; row < map.$maxRows; row++) {
      tiles.push([]);
      for (let col = 0; col < map.$maxCols; col++) {
        const tile = tileFactory.createTile(
            null,
            map.$id.$value,
            row,
            col,
            TileType.Grass,
        );
        const addedTile = await tileRepository.createTile(tile);
        tiles[row].push(addedTile);
      }
    }

    // assert all tiles exists
    const actualTiles = await tileRepository.getAllTiles(map);
    for (let row = 0; row < map.$maxRows; row++) {
      for (let col = 0; col < map.$maxCols; col++) {
        const actualTile = actualTiles[row][col];
        const expectedTile = tiles[row][col];
        assert(actualTile.$mapID.$value === expectedTile.$mapID.$value, 'Unexpected mapID');
        assert(actualTile.$row === expectedTile.$row, 'Unexpected row');
        assert(actualTile.$col === expectedTile.$col, 'Unexpected col');
        assert(actualTile.$type === expectedTile.$type, 'Unexpected type');
      }
    }
  });
});
