/* eslint-disable require-jsdoc */
import {ITileRepository} from '../ITileRepository';
import {Tile} from '../../domain/Tile';
import {Map} from '../../domain/Map';
import {TileMapper} from '../../mappers/TileMapper';
import {MapMapper} from '../../mappers/MapMapper';
import {log} from '../../../../shared/utils/log';
import {TileRepositoryErrors} from '../TileRepositoryErrors';

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
    // check to see if tile exists at row,col already
    try {
      await this.getTileAt(tile.$row, tile.$col);
    } catch (err) {
      if (err.message != TileRepositoryErrors.NonexistentTile) {
        throw new Error(TileRepositoryErrors.TileAlreadyExists);
      }
    }
    const dbTile = await this.models.tile.create({
      map_id: tile.$mapID.$value,
      tile_row: tile.$row,
      tile_col: tile.$col,
      tile_type: tile.$type,
    });
    return this.tileMapper.fromPersistence(dbTile);
  }

  async updateTileAt(tile: Tile): Promise<Tile> {
    // get the tile to update
    const dbTile = await this.models.tile.findOne({
      where: {
        tile_row: tile.$row,
        tile_col: tile.$col,
      },
    });
    if (dbTile === null) {
      throw new Error(TileRepositoryErrors.NonexistentTile);
    }
    // update the tiles type
    const updatedTile = await dbTile.update({
      tile_type: tile.$type,
    });
    // return updated tile
    return this.tileMapper.fromPersistence(updatedTile);
  }

  async updateTile(tile: Tile): Promise<Tile> {
    // get tile from db
    const dbTile = await this.models.tile.findOne({
      where: {tile_id: tile.$id.$value},
    });
    if (dbTile === null) {
      throw new Error(TileRepositoryErrors.NonexistentTile);
    }
    // update tile properties
    const updatedTile = await dbTile.update({
      tile_type: tile.$type,
    });
    return this.tileMapper.fromPersistence(updatedTile);
  }

  async getTile(tile: Tile): Promise<Tile> {
    const dbTile = await this.models.tile.findOne({
      where: {
        tile_id: tile.$id.$value,
      },
    });
    if (dbTile === null) {
      throw new Error(TileRepositoryErrors.NonexistentTile);
    }
    return this.tileMapper.fromPersistence(dbTile);
  }

  async getTileAt(row: number, col: number): Promise<Tile> {
    const dbTile = await this.models.tile.findOne({
      where: {
        tile_row: row,
        tile_col: col,
      },
    });
    if (dbTile === null) {
      throw new Error(TileRepositoryErrors.NonexistentTile);
    }
    return this.tileMapper.fromPersistence(dbTile);
  }

  async getAllTiles(map: Map): Promise<Array<Array<Tile>>> {
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
  }
}
