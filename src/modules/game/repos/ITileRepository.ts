import {Tile} from '../domain/Tile';

export interface ITileRepository {
  createTile(tile: Tile): Promise<Tile>;
  getTile(tile: Tile): Promise<Tile>;
  getTileAt(row: number, col: number): Promise<Tile>;
  getAllTiles(tile: Tile): Promise<Array<Array<Tile>>>;
  updateTile(tile: Tile): Promise<Tile>;
}
