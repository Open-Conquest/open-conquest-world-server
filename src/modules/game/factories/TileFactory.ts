/* eslint-disable require-jsdoc */
import {EntityID} from '../../../shared/domain/EntityID';
import {TileType} from '../domain/TileType';
import {Tile} from '../domain/Tile';

/**
 * This class is meant to handle the construction of `Tile` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Tile.
 *
 * @class TileFactory
 */
export class TileFactory {
  /**
   * Creates an instance of TileFactory.
   * @memberof TileFactory
   */
  constructor() {}

  createTile(id: number, mapID: number, row: number, col: number, type: TileType): Tile {
    return new Tile(
        new EntityID(id),
        new EntityID(mapID),
        row,
        col,
        type,
    );
  }
}
