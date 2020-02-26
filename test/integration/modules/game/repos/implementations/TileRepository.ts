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

  // 1.
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
    assert.fail('no test');
  });
});

/**
 * Summary of tests for TileRepository:getAllTiles
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
    assert.fail('no test');
  });
});

