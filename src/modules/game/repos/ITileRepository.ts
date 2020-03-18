import {Tile} from '../domain/Tile';
import {Map} from '../domain/Map';

export interface ITileRepository {
  createTile(tile: Tile): Promise<Tile>;
  getTile(tile: Tile): Promise<Tile>;
  getTileAt(row: number, col: number): Promise<Tile>;
  getAllTiles(map: Map): Promise<Array<Array<Tile>>>;
  updateTile(tile: Tile): Promise<Tile>;
  updateTileAt(tile: Tile): Promise<Tile>;
}
