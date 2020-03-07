import {Tile} from '../domain/Tile';
import {TileFactory} from '../factories/TileFactory';
// import {TileDTO} from '../dtos/TileDTO';

/**
 * TileMapper is responsible for mappings between the domain tile entity
 * and the persistence (sequelize) representation of a tile.
 */
export class TileMapper {
  private tileFactory: TileFactory

  /** Creates an instance of TileMapper. */
  constructor() {
    this.tileFactory = new TileFactory();
  }

  /**
   * Create a domain entity from a sequelize object.
   *
   * @param {*} dbTile
   * @return {Tile}
   * @memberof TileMapper
   */
  fromPersistence(dbTile: any): Tile {
    if (dbTile === null) {
      return null;
    }

    return this.tileFactory.createTile(
        dbTile.tile_id,
        dbTile.map_id,
        dbTile.tile_row,
        dbTile.tile_col,
        dbTile.tile_type,
    );
  }

  // /**
  //  * Create a tile entity from the dto.
  //  *
  //  * @param {TileDTO} dto
  //  * @return {Tile}
  //  * @memberof TileMapper
  //  */
  // fromDTO(dto: TileDTO): Tile {
  //   // return this.tileFactory.createTile(
  //   //     null,
  //   //     dto.$name,
  //   // );
  //   throw new Error('no impl');
  // }

  // /**
  //  * Create a dto from a tile entity.
  //  *
  //  * @param {Tile} tile
  //  * @return {TileDTO}
  //  * @memberof TileMapper
  //  */
  // toDTO(tile: Tile): TileDTO {
  //   // return new TileDTO(
  //   //     tile.getNameString(),
  //   // );
  //   throw new Error('no impl');
  // }
}
