/* eslint-disable require-jsdoc */
import {ITileRepository} from '../ITileRepository';
import {Tile} from '../../domain/Tile';
import {Player} from '../../domain/Player';
import {TileMapper} from '../../mappers/TileMapper';
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
      const dbTile = await this.models.tile.create({
        map_id: tile.$mapID.$value,
        tile_row: tile.$row,
        tile_col: tile.$col,
        tile_type: tile.$type,
      });
      // map from db to domain and return
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
      log.error(err.message);
      throw err;
    }
  }

  async getTile(tile: Tile): Promise<Tile> {
    try {
      const dbTile = await this.models.tile.findOne({
        where: {
          tile_id: tile.$id,
        },
      });
      return this.tileMapper.fromPersistence(dbTile);
    } catch (err) {
      // check if is a known error
      log.error('unknown error', err);
    }
  }i

  // getAllCities(tile: any): Promise<any[]> {
  //   throw new Error("Method not implemented.");
  // }
}
