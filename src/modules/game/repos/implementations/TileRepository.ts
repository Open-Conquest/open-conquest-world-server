/* eslint-disable require-jsdoc */
import {ITileRepository} from '../ITileRepository';
import {Tile} from '../../domain/Tile';
import {Map} from '../../domain/Map';
import {TileMapper} from '../../mappers/TileMapper';
import {MapMapper} from '../../mappers/MapMapper';
import {log} from '../../../../shared/utils/log';

/**
 * Repository implementation for tile entities.
 *
 * @export
 * @class TileRepository
 * @implements {ITileRepository}
 */
export class TileRepository implements ITileRepository {
  private models: any;
  private tileMapper: TileMapper;

  /**
   * Creates an instance of TileRepository.
   *
   * @param {*} models
   * @memberof TileRepository
   */
  constructor(models: any) {
    this.models = models;
    this.tileMapper = new TileMapper();
  }

  async createTile(tile: Tile): Promise<Tile> {
    try {
      // check to see if tile exists at row,col already
      if (await this.getTileAt(tile.$row, tile.$col) !== null) {
        throw new Error('A tile already exists at row,col');
      }
      const dbTile = await this.models.tile.create({
        map_id: tile.$mapID.$value,
        tile_row: tile.$row,
        tile_col: tile.$col,
        tile_type: tile.$type,
      });
      return this.tileMapper.fromPersistence(dbTile);
    } catch (err) {
      // check to see what type of error was returned
      log.error(err.message);
      throw err;
    }
  }

  async updateTile(tile: Tile): Promise<Tile> {
    try {
      // get tile from db
      const dbTile = await this.models.tile.findOne({
        where: {tile_id: tile.$id.$value},
      });
      if (dbTile === null) {
        throw new Error('No tile found');
      }
      // update tile properties
      const updatedTile = await dbTile.update({
        tile_type: tile.$type,
      });
      return this.tileMapper.fromPersistence(updatedTile);
    } catch (err) {
      throw err;
    }
  }

  async getTile(tile: Tile): Promise<Tile> {
    try {
      const dbTile = await this.models.tile.findOne({
        where: {
          tile_id: tile.$id.$value,
        },
      });
      return this.tileMapper.fromPersistence(dbTile);
    } catch (err) {
      // check if is a known error
      log.error('Error in getTile', err.stack);
      throw new Error();
    }
  }

  async getTileAt(row: number, col: number): Promise<Tile> {
    try {
      const dbTile = await this.models.tile.findOne({
        where: {
          tile_row: row,
          tile_col: col,
        },
      });
      return this.tileMapper.fromPersistence(dbTile);
    } catch (err) {
      // check if is a known error
      log.error('Error in getTileAt', err.stack);
      throw new Error();
    }
  }

  async getAllTiles(map: Map): Promise<Array<Array<Tile>>> {
    try {
      const dbTiles = await this.models.tile.findAll({
        where: {map_id: map.$id.$value},
        order: [
          ['tile_row', 'ASC'],
          ['tile_col', 'ASC'],
        ],
      });
      // create new array of tile
      const tiles = [];
      for (let row = 0; row < map.$maxRows; row++) {
        tiles.push([]);
        for (let col = 0; col < map.$maxCols; col++) {
          const tile = this.tileMapper.fromPersistence(
              dbTiles[row*map.$maxRows + col],
          );
          tiles[row].push(tile);
        }
      }
      return tiles;
    } catch (err) {
      log.error('Error in getAllTiles', err.stack);
      throw new Error();
    }
  }
}
