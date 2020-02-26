import {Tile} from '../domain/Tile';

export interface ITileRepository {
  createTile(tile: Tile): Promise<Tile>;
  // getTile(tile: Tile): Promise<Tile>;
  // getAllTiles(tile: Tile): Promise<Array<Tile>>;
  // updateTile(tile: Tile): Promise<Tile>;
}
